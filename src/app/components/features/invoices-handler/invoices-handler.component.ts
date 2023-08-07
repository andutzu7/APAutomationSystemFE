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
  ngOnInit() {
    this.getInvoices();
    this.invoicesData = {
      invoiceDDOList: this.invoiceDDOList,
      individualInvoice: this.individualInvoice,
    }
  }
  getInvoices() {
    this.invoiceDDOList = this.invoiceService.getInvoices();
  }
  deleteInvoice(invoiceId: string) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(answer => {

      //atm response is void, for the future check for its resp code
      this.getInvoices();
      this.invoicesData = {
        invoiceDDOList: this.invoiceDDOList,
        individualInvoice: this.individualInvoice,
      }
    });
  }
  getInvoice(invoiceId: string) {
    this.invoicesData.individualInvoice = this.invoiceService.getInvoice(invoiceId);
  }
  executeCommand(invoiceCommand: any) {

    switch (invoiceCommand.action) {

      case 'delete':
        this.deleteInvoice(invoiceCommand.id);
        break;
      case 'display':
        this.getInvoice(invoiceCommand.id)
        break;

    }

  }
}

