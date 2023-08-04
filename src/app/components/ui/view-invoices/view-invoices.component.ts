import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceRenderer } from '../invoice-renderer/invoice-renderer.component';



@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewInvoicesComponent {

  constructor(private dialog: MatDialog){
    
  }

  public columnsToDisplay = ['idColumn', 'buyerColumn', 'sellerColumn', 'moreDetailsColumn', 'deleteColumn'];

  @Input() invoiceDDOList!: InvoiceDDO[];

  @Output() invoiceCommand = new EventEmitter<any>();

  openInvoiceDialog() {

    console.log("se apeleaza")
    this.dialog.open(InvoiceRenderer);
  }
  public emitInvoiceCommand(id: string, action: string) {
    this.invoiceCommand.emit({
      'id': id,
      "action": action
    })
  }

}

