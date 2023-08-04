import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { InvoiceRenderer } from '../components/ui/invoice-renderer/invoice-renderer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';

@Component({
  selector: 'app-invoices-handler',
  templateUrl: './invoices-handler.component.html',
  styleUrls: ['./invoices-handler.component.css']
})
export class InvoicesHandlerComponent {

  private invoiceService: InvoiceService;
  public invoiceDDOList!: Observable<InvoiceDDO[]>;
  public individualInvoice!: Observable<InvoiceDTO>;

  constructor(private service: InvoiceService) {
    this.invoiceService = service;
  }

  ngOnInit() {
    this.invoiceDDOList = this.getInvoices();
  }

  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  deleteInvoice(invoiceId: string) {

    this.invoiceService.deleteInvoice(invoiceId);
  }

  getInvoice(invoiceId: string) {
    return this.invoiceService.getInvoice(invoiceId);
  }
  executeCommand(invoiceCommand: any) {

    switch (invoiceCommand.action) {

      case 'delete':

        this.deleteInvoice(invoiceCommand.id);
        console.log('delete')
        break;
      case 'display':
        this.individualInvoice=this.getInvoice(invoiceCommand.id)
        break;


    }

  }
}

