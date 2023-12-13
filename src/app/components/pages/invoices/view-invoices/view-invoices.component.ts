import { Component } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css'],
})
export class ViewInvoicesComponent {

  public invoiceDDOList!: InvoiceDDO[];
  public individualInvoice!: InvoiceDTO;
  public invoiceDataSource = new MatTableDataSource();
  public columnsToDisplay = ['idColumn', 'buyerColumn', 'sellerColumn', 'statusColumn', 'newTabColumn', 'deleteColumn'];
  page!: number;
  pageSize!: number;
  totalLength: number = 10;
  taxAmount!: number;
  selectedMonth!: number;
  selectedYear!: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page']-1 || 0;
      this.pageSize = +params['pageSize'] || 25;
  
      this.getInvoices();
    });

    const now = new Date();
    this.selectedMonth = now.getMonth()+1;
    this.selectedYear = now.getFullYear();
    this.invoiceService.getTaxAmount(this.selectedMonth, this.selectedYear);

    this.computeInvoiceTax();
  }

  getInvoices() {
    this.invoiceService.getInvoices(this.page, this.pageSize).subscribe(response => {
      this.invoiceDDOList = response.content;
      this.invoiceDataSource.data = response.content;

      this.totalLength = response.totalElements
    })
  }

  deleteInvoice(invoiceId: string) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(answer => {

      this.invoiceDDOList = this.invoiceDDOList.filter((invoice) => (invoice.identifier != invoiceId))
      //de filtrat lista
      this.invoiceDataSource.data = this.invoiceDDOList;
    });
  }

  onPageChanged(event: any) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

    this.getInvoices();
    this.updateUrl();
  }

  private updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page + 1, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
    });
  }

  parseInputDate(selection: string) {
    if (Number(selection) >= 1 && Number(selection) <= 12) {
      this.selectedMonth = Number(selection);
    }else{
      this.selectedYear = Number(selection);
    }
    this.computeInvoiceTax();
  }

  computeInvoiceTax() {
    this.invoiceService.getTaxAmount(this.selectedMonth, this.selectedYear).subscribe(response => {

      this.taxAmount = response.valueOf();

    });
  }
}

