import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../models/item';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent {
  purchaseOrder !: OrderResponse;

  constructor(private route: ActivatedRoute,
    private ordersService: OrdersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPurchaseOrder();
  }

  getPurchaseOrder(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.ordersService.getPurchaseOrder(id!).subscribe(p => {
      this.purchaseOrder = p
    });
  }

  removeOrderItem(item: Item): void {
    const updatedOrderPayload: OrderRequest = this.createRemoveItemRequest(item);

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, updatedOrderPayload).subscribe(
      (resp) => {
        this.purchaseOrder = resp;
      },
      (error) => {
        if (error.status === 412) {
          this.showError(error.error.details);
        }
      }
    )
  }

  saveOrder(): void {
    this.ordersService.savePurchaseOrder(this.purchaseOrder.identifier).subscribe(response => {
      this.purchaseOrder = response;
    }
    );
  }

  addOrderItem(): void {
    let dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '300px',
      data: { order: this.purchaseOrder }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPurchaseOrder();
    });
  }

  createRemoveItemRequest(item: Item): OrderRequest {
    let updatedItems: Item[] = this.purchaseOrder.items.slice();
    updatedItems = updatedItems.filter(it => it !== item);

    const updatedOrderPayload: OrderRequest = new OrderRequest(
      this.purchaseOrder.buyer.companyIdentifier,
      this.purchaseOrder.seller.companyIdentifier,
      updatedItems
    );
    updatedOrderPayload.version = this.purchaseOrder.version;

    return updatedOrderPayload;
  }

  showError(errorMessage: string){
    let snackBarRef = this.snackBar.open(errorMessage, "RELOAD")

    snackBarRef.onAction().subscribe(()=>{
      window.location.reload()
    })
  }


}

