import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../models/item';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
        error: (e) => {
          if (e.status === 412) {
            this.showError(e.error.details);
          }
        }
      }
    );
  }

  saveOrder(): void {
    const orderPayload: OrderRequest = this.createSaveOrderRequest();

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, orderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
          this.showSuccess("Successfully saved!")
        },
        error: (e) => {
          if (e.status === 412) {
            this.showError(e.error.details);
          }
        }
      }
    );
  }

  approveOrder(): void{
    const orderPayload: OrderRequest = this.createApproveOrderRequest();

    this.ordersService.updatePurchaseOrder(this.purchaseOrder.identifier, orderPayload).subscribe(
      {
        next: (resp) => {
          this.purchaseOrder = resp;
          this.showSuccess("Successfully approved!")
        },
        error: (e) => {
          if (e.status === 412) {
            this.showError(e.error.details);
          }
        }
      }
    );
  }


  private createSaveOrderRequest(): OrderRequest {
    const orderPayload: OrderRequest = new OrderRequest(
      this.purchaseOrder.identifier,
      this.purchaseOrder.buyer.companyIdentifier,
      this.purchaseOrder.seller.companyIdentifier,
      this.purchaseOrder.items,
      "SAVED"
    )
    orderPayload.version = this.purchaseOrder.version;

    return orderPayload;
  }

  private createApproveOrderRequest(): OrderRequest {
    const orderPayload: OrderRequest = new OrderRequest(
      this.purchaseOrder.identifier,
      this.purchaseOrder.buyer.companyIdentifier,
      this.purchaseOrder.seller.companyIdentifier,
      this.purchaseOrder.items,
      "APPROVED"
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

  showError(errorMessage: string) {
    let snackBarRef = this.snackBar.open(errorMessage, "RELOAD")

    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    })
  }

  showSuccess(successMessage: string) {
    this.snackBar.open(successMessage, "", {
      duration: 1000,
    });
  }

}

