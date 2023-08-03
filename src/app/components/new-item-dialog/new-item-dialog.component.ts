import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css']
})
export class NewItemDialogComponent {
  orderForm !: FormGroup
  availableItems!: Item[];
  error: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrdersService,
    private itemsService: ItemsService,) { }

  ngOnInit(): void {
    this.createForm();
    this.availableItems = this.itemsService.getAllItems()
  }

  private createForm() {
    this.orderForm = new FormGroup({
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }

  private createUpdatedOrderRequest(existingOrder: OrderResponse, newItemForm: FormGroup): OrderRequest {
    const updatedOrderItems: Item[] = existingOrder.items.slice();
    const newItem = newItemForm.value.item;

    newItem.quantity = newItemForm.value.quantity;
    updatedOrderItems.push(newItem);

    const orderPayload: OrderRequest = new OrderRequest(
      existingOrder.buyer.companyIdentifier,
      existingOrder.seller.companyIdentifier,
      updatedOrderItems
    )

    return orderPayload;
  }

  onSubmit() {
    const newOrderItem = this.orderForm.value;

    if (newOrderItem.item.description == null) {
      this.error = true;
    }
    else {
      this.error = false;

      // it maintains identifier, buyer and seller from already existing order, but 'items' field is updated
      // const updatedOrderItems: Item[] = this.data.order.items.slice();
      // const newItem = newOrderItem.item;

      // newItem.quantity = newOrderItem.quantity;
      // updatedOrderItems.push(newItem)

      // const orderPayload: OrderRequest = new OrderRequest(this.data.order.buyer.companyIdentifier, this.data.order.seller.companyIdentifier, updatedOrderItems)
      
      const orderPayload: OrderRequest = this.createUpdatedOrderRequest(this.data.order, this.orderForm)
      const identifier: string = this.data.order.identifier;

      this.ordersService.updatePurchaseOrder(identifier, orderPayload).subscribe(resp => {
        console.log("Response: " + resp.items)
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

