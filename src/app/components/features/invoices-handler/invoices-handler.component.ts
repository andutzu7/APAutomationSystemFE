import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
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
  public invoicesData!: { invoiceDDOList: Observable<InvoiceDDO[]>, individualInvoice: Observable<InvoiceDTO> }

  constructor(private service: InvoiceService) {
    this.invoiceService = service;
  }
  getInvoice(invoiceId: string) {
    this.invoicesData.individualInvoice = this.invoiceService.getInvoice(invoiceId);
  }
}

