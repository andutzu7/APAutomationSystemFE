import { Component } from '@angular/core';
import { SimpleOrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-purchase-orders',
  templateUrl: './view-purchase-orders.component.html',
  styleUrls: ['./view-purchase-orders.component.css']
})
export class ViewPurchaseOrdersComponent {
  displayedColumns: string[] = ['identifier', 'buyer', 'seller', 'status'];
  dataSource !: MatTableDataSource<SimpleOrderResponse>
  page: number = 0;
  pageSize: number = 5

  constructor(
    private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getPurchaseOrders();
  }

  getPurchaseOrders(): void {
    this.ordersService.getPurchaseOrders(this.page, this.pageSize).subscribe(
      orders => {
        this.dataSource = new MatTableDataSource<SimpleOrderResponse>(orders);
      });
  }

  onPageChanged(event:any){
    this.page = event.pageIndex
    this.pageSize = event.pageSize
    
    this.getPurchaseOrders();
  }
}
