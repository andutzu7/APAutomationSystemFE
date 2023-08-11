import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  constructor(private invoiceService: InvoiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public columnsToDisplay = ['idColumn', 'buyerColumn', 'sellerColumn',  'newTabColumn', 'deleteColumn'];

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

      this.invoiceDDOList=this.invoiceDDOList.filter((invoice)=>(invoice.identifier != invoiceId))
      //de filtrat lista
      this.invoiceDataSource.data=this.invoiceDDOList;
    });
  }
}

