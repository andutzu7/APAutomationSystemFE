import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { InvoiceDDO } from 'src/app/models/invoiceDDO';
import { Observable} from 'rxjs';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoiceRenderer } from '../invoice-renderer/invoice-renderer.component';
import { InvoicesHandlerComponent } from 'src/app/components/features/invoices-handler/invoices-handler.component';


@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInvoicesComponent {

  constructor(private invoiceHandlerComponent: InvoicesHandlerComponent, private dialog: MatDialog) {

  }

  public columnsToDisplay = ['idColumn', 'buyerColumn', 'sellerColumn', 'moreDetailsColumn', 'deleteColumn'];

  @Input() invoicesData!: { invoiceDDOList: Observable<InvoiceDDO[]>, individualInvoice: Observable<InvoiceDTO> };

  @Output() invoiceCommand = new EventEmitter<any>();


  openInvoiceDialog() {

    const dialogConfig = new MatDialogConfig();

    this.invoicesData.individualInvoice.subscribe(invoiceData => {
      dialogConfig.data = invoiceData;
      this.dialog.open(InvoiceRenderer, dialogConfig);
    })

  }

  public emitInvoiceCommand(id: string, action: string) {
    this.invoiceCommand.emit({
      'id': id,
      "action": action
    })
  }

}

