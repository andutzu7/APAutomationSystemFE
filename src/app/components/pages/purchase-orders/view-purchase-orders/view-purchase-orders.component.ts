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
  totalLength: number = 10;
  taxAmount!: number;
  selectedMonth!: number;
  selectedYear!: number;

  constructor(
    private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getPurchaseOrders();

    const now = new Date();
    this.selectedMonth = now.getMonth();
    this.selectedYear = now.getFullYear();
    this.computeOrderTax();
  }

  getPurchaseOrders(): void {
    this.ordersService.getPurchaseOrders(this.page, this.pageSize).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<SimpleOrderResponse>(response.content);
        this.totalLength = response.totalElements
      });
  }

  onPageChanged(event: any) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

    this.getPurchaseOrders();
  }

  computeOrderTax() {
    this.ordersService.getTaxAmount(this.selectedMonth, this.selectedYear).subscribe(response => {

      this.taxAmount = response.valueOf();

    });
  }

  parseInputDate(selection: string) {
    if (Number(selection) >= 1 && Number(selection) <= 12) {
      this.selectedMonth = Number(selection);
    } else {
      this.selectedYear = Number(selection);
    }
    this.computeOrderTax();
  }
}

