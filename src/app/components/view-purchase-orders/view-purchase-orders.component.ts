import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-purchase-orders',
  templateUrl: './view-purchase-orders.component.html',
  styleUrls: ['./view-purchase-orders.component.css']
})
export class ViewPurchaseOrdersComponent {
  displayedColumns: string[] = ['identifier', 'buyer', 'seller', 'status'];
  dataSource !: MatTableDataSource<Order>

  constructor(
    private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getPurchaseOrders();
  }

  getPurchaseOrders(): void {
    this.ordersService.getPurchaseOrders().subscribe(p => {
      this.dataSource = new MatTableDataSource<Order>(p);
    });

  }

}
