import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent {
  purchaseOrder !: Order;

  constructor(private route: ActivatedRoute,
    private ordersService: OrdersService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getPurchaseOrder();
  }

  getPurchaseOrder(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ordersService.getPurchaseOrder(id!).subscribe(p => {
      this.purchaseOrder = p
    });
  }

  remove(item: Item): void {
    let updatedItems: Item[] = this.purchaseOrder.items;
    updatedItems = updatedItems.filter(it => it !== item);

    const updatedOrderPayload: Order = this.purchaseOrder;
    updatedOrderPayload.items = updatedItems;

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, updatedOrderPayload).subscribe(() => {
      console.log('update op response')
    })
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(NewOrderDialog, {
      width: '300px',
      data: { order: this.purchaseOrder }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order-dialog.component.html',
})
export class NewOrderDialog {
  orderForm !: FormGroup
  availableItems!: Item[];
  error: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewOrderDialog>,
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
