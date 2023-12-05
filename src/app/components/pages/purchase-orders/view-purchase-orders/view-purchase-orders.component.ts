import { Component } from '@angular/core';
import { SimpleOrderResponse } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-purchase-orders',
  templateUrl: './view-purchase-orders.component.html',
  styleUrls: ['./view-purchase-orders.component.css']
})
export class ViewPurchaseOrdersComponent {
  displayedColumns: string[] = ['identifier', 'buyer', 'seller', 'status'];
  dataSource !: MatTableDataSource<SimpleOrderResponse>
  page!: number;
  pageSize!: number;
  totalLength: number = 10;
  taxAmount!: number;
  selectedMonth!: number;
  selectedYear!: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page']-1 || 0;
      this.pageSize = +params['pageSize'] || 25;
  
      this.getPurchaseOrders();
    });

    const now = new Date();
    this.selectedMonth = now.getMonth()+1;
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
    this.updateUrl();
  }

  private updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page + 1, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
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

