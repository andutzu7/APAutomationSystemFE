import { Component, Inject } from '@angular/core';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'invoice-renderer',
  templateUrl: './invoice-renderer.component.html',
  styleUrls: ['./invoice-renderer.component.css'],
})
export class InvoiceRenderer {

  public individualInvoice!: InvoiceDTO

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
  ) { }

  public columnsToDisplay = ['descriptionColumn', 'quantityColumn', 'priceColumn'];


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.getInvoice(id);
  }

  getInvoice(id: any){
    this.invoiceService.getInvoice(id).subscribe(answer => {

      this.individualInvoice = answer;
    });
  }
}

