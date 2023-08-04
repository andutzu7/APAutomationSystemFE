import { Component } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
@Component({
  selector: 'invoice-renderer',
  templateUrl: './invoice-renderer.component.html',
  styleUrls: ['./invoice-renderer.component.css']
})
export class InvoiceRenderer {

  @Input() public individualInvoice!: any

  constructor() { }

 //
  public columnsToDisplay = ['descriptionColumn', 'quantityColumn', 'priceColumn'];
  public functor(){
    console.log(this.individualInvoice);
  }

}

