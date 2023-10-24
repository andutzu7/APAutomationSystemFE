import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { Output, EventEmitter } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInvoicesComponent {

  public invoiceDDOList!: InvoiceDDO[];
  public individualInvoice!: InvoiceDTO;
  public invoiceDataSource = new MatTableDataSource();
  public columnsToDisplay = ['idColumn', 'buyerColumn', 'sellerColumn', 'statusColumn', 'newTabColumn', 'deleteColumn'];

  constructor(private invoiceService: InvoiceService) { }

  @Output() invoiceCommand = new EventEmitter<any>();

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(invoiceList => {
      this.invoiceDDOList = invoiceList;
      this.invoiceDataSource.data = invoiceList;
    })
  }

  deleteInvoice(invoiceId: string) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(answer => {

      this.invoiceDDOList = this.invoiceDDOList.filter((invoice) => (invoice.identifier != invoiceId))
      //de filtrat lista
      this.invoiceDataSource.data = this.invoiceDDOList;
    });
  }
}

