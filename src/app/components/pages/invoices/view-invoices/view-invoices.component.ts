import { Component } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatTableDataSource } from '@angular/material/table';

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
  page: number = 0;
  pageSize: number = 5
  totalLength: number = 10;
  taxAmount!: number;
  selectedMonth!: number;
  selectedYear!: number;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();

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

