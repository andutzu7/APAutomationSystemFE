import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent {

  private invoiceService: InvoiceService;
  public invoices!: any;
  public selectedInvoice!: Invoice;
  invoice_popup = false;


  constructor(private service: InvoiceService) {
    this.invoiceService = service;
  }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(data => {
    this.invoices = data;
    });

  }
  async updateSelectedInvoiceValue(uuid: string) {

    let data = await firstValueFrom(this.invoiceService.getInvoice(uuid));
    this.selectedInvoice = data;

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

