import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent {

  private invoiceService: InvoiceService;
  public invoiceDDOList!: any;
  public columnsToDisplay = ['idColumn', 'buyerColumn','sellerColumn','moreDetailsColumn','deleteColumn'];

  constructor(private service: InvoiceService) {
    this.invoiceService = service;
  }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(data => {
    this.invoiceDDOList= data;
    });

  }
  /**
   * deleteInvoice
   uuid:string */
  public deleteInvoice(uuid: string) {
    if (confirm("Are you sure?")) {
      this.invoiceService.deleteInvoice(uuid).subscribe(data => { });
      this.getInvoices();
    }

  }

}

