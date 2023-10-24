import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequest, OrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { FileTransferService } from 'src/app/services/filetransfer.service';
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
  totalAmount: number = 0;

  constructor(private route: ActivatedRoute,
    private ordersService: OrdersService,
    private fileTrnasferService: FileTransferService,
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

  computeTotalAmount(items: Item[]): number {
    let amount = 0;

    items.forEach(item => {
      amount += item.price! * item.quantity!
    })

    return amount;
  }

  getPurchaseOrder(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.ordersService.getPurchaseOrder(id!).subscribe(
      order => {
        this.purchaseOrder = order;
        this.totalAmount = this.computeTotalAmount(this.purchaseOrder.items);
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
          this.totalAmount = this.computeTotalAmount(this.purchaseOrder.items);
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

  approveOrder(): void {
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

  rejectOrder(): void {
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

  downloadOrder(): void {
    this.fileTrnasferService.getFile(this.purchaseOrder.uri).subscribe(
      {
        next: (resp) => {
          const file = new Blob([resp], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank', 'width=1000, height=800');
          console.log(resp)
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
      orderStatus,
      this.purchaseOrder.uri
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
      this.purchaseOrder.orderStatus,
      this.purchaseOrder.uri
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