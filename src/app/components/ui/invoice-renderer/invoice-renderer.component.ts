import { Component, Inject } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'invoice-renderer',
  templateUrl: './invoice-renderer.component.html',
  styleUrls: ['./invoice-renderer.component.css']
})
export class InvoiceRenderer {

  public individualInvoice!: any

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.individualInvoice = data;
  }

  public columnsToDisplay = ['descriptionColumn', 'quantityColumn', 'priceColumn'];

}

