import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css']
})
export class NewItemDialogComponent {
  orderForm !: FormGroup
  availableItems!: Item[];
  inputError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrdersService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.createForm();
    this.availableItems = this.itemsService.getAllItems()
  }


  onClose(): void {
    this.dialogRef.close();
  }


  private createForm() {
    this.orderForm = new FormGroup({
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }


  onSubmit() {
    const newOrderItem = this.orderForm.value;

    if (newOrderItem.item.description == null) {
      this.inputError = true;
    }
    else {
      this.inputError = false;

      // it maintains identifier, buyer and seller from already existing order, but 'items' field is updated
      const orderPayload: OrderRequest = this.createUpdatedOrderRequest(this.data.order, this.orderForm)
      orderPayload.version = this.data.order.version;

      const identifier: string = this.data.order.identifier;

      this.ordersService.updatePurchaseOrder(identifier, orderPayload).subscribe(
        {
          next: (resp) => {
            this.data.order = resp;
            this.showSuccess("Successfully added!")
          },
        }
      )
    }
  }

  
  showSuccess(successMessage: string) {
    this.snackBar.open(successMessage, "", {
      duration: 1000,
    });
  }


  private createUpdatedOrderRequest(existingOrder: OrderResponse, newItemForm: FormGroup): OrderRequest {
    const updatedOrderItems: Item[] = existingOrder.items.slice();
    const newItem = newItemForm.value.item;

    let alreadyExistent: boolean = false;

    updatedOrderItems.forEach(item => {
      if (item.description == newItem.description) {
        alreadyExistent = true;
        item.quantity += newItemForm.value.quantity;
      }
    })

    if (alreadyExistent == false) {
      newItem.quantity = newItemForm.value.quantity;
      updatedOrderItems.push(newItem);
    }

    const orderPayload: OrderRequest = new OrderRequest(
      existingOrder.identifier,
      existingOrder.buyer.companyIdentifier,
      existingOrder.seller.companyIdentifier,
      updatedOrderItems,
      existingOrder.orderStatus
    )

    return orderPayload;
  }

}

