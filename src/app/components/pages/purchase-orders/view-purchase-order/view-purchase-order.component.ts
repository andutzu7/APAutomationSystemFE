import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../../../models/item';
import { NewItemDialogComponent } from '../../../ui/new-item-dialog/new-item-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent {
  purchaseOrder !: OrderResponse;
  userRoles: string[] = [];

  constructor(private route: ActivatedRoute,
    private ordersService: OrdersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPurchaseOrder();

    this.authService.userRoles$.subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  getPurchaseOrder(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.ordersService.getPurchaseOrder(id!).subscribe(
      order => {
        this.purchaseOrder = order
      });
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

  removeOrderItem(item: Item): void {
    const updatedOrderPayload: OrderRequest = this.createRemoveItemRequest(item);

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, updatedOrderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
        },
      }
    );
  }

  saveOrder(): void {
    const orderPayload: OrderRequest = this.createUpdateOrderRequest("SAVED");

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, orderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
          this.showSuccess("Successfully saved!")
        },
      }
    );
  }

  approveOrder(): void{
    const orderPayload: OrderRequest = this.createUpdateOrderRequest("APPROVED");

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, orderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
          this.showSuccess("Successfully approved!")
        },
      }
    );
  }

  rejectOrder(): void{
    const orderPayload: OrderRequest = this.createUpdateOrderRequest("REJECTED");

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, orderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
          this.showSuccess("Successfully rejected!")
        },
      }
    );
  }

  private createUpdateOrderRequest(orderStatus: String): OrderRequest {
    const orderPayload: OrderRequest = new OrderRequest(
      this.purchaseOrder.identifier,
      this.purchaseOrder.buyer.companyIdentifier,
      this.purchaseOrder.seller.companyIdentifier,
      this.purchaseOrder.items,
      orderStatus
    )
    orderPayload.version = this.purchaseOrder.version;

    return orderPayload;
  }

  private createRemoveItemRequest(item: Item): OrderRequest {
    let updatedItems: Item[] = this.purchaseOrder.items.slice();
    updatedItems = updatedItems.filter(it => it !== item);

    const updatedOrderPayload: OrderRequest = new OrderRequest(
      this.purchaseOrder.identifier,
      this.purchaseOrder.buyer.companyIdentifier,
      this.purchaseOrder.seller.companyIdentifier,
      updatedItems,
      this.purchaseOrder.orderStatus
    );

    updatedOrderPayload.version = this.purchaseOrder.version;

    return updatedOrderPayload;
  }

  showSuccess(successMessage: string) {
    this.snackBar.open(successMessage, "", {
      duration: 1000,
    });
  }

}

