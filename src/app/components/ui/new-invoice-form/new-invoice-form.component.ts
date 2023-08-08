import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css']
})
export class NewInvoiceFormComponent {
  orderForm !: FormGroup
  availableItems!: Item[];
  error: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewInvoiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordersService: OrdersService,
    private itemsService: ItemsService,) { }

  ngOnInit(): void {
    this.createForm();
    this.availableItems = this.itemsService.getAllItems()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private createForm() {
    this.orderForm = new FormGroup({
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }

  onSubmit() {
    const newOrder = this.orderForm.value;

    if (newOrder.item.description == null) {
      this.error = true;
    }
    else {
      this.error = false;

      // it maintains identifier, buyer and seller from already existing order, but 'items' field is updated
      const existingOrderItems: Item[] = this.data.order.items;
      const newItem = newOrder.item;

      newItem.quantity = newOrder.quantity;
      existingOrderItems.push(newItem)

      const orderPayload: Order = new Order(this.data.order.buyer, this.data.order.seller, existingOrderItems)
      const identifier: string = this.data.order.identifier;

      this.ordersService.updatePurchaseOrder(identifier, orderPayload).subscribe(() => {
        console.log('update op response')
      })
    }
  }
}

