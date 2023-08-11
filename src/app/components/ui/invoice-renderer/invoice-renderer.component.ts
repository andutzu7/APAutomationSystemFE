import { Component, Inject } from '@angular/core';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'invoice-renderer',
  templateUrl: './invoice-renderer.component.html',
  styleUrls: ['./invoice-renderer.component.css'],
})
export class InvoiceRenderer {

  public individualInvoice!: InvoiceDTO
  public isLoaded: boolean = false;
  items: Item[] = [];
  invoiceItemList: Item[] = [];
  displayForm: boolean = false;
  itemsForm!: FormGroup;
  public itemListDataSource = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private itemsService: ItemsService,
  ) { }

  public columnsToDisplay = ['descriptionColumn', 'quantityColumn', 'priceColumn', 'deleteColumn'];


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.items = this.itemsService.getAllItems();
    this.createForm();
    this.getInvoice(id).subscribe(answer => {

      this.individualInvoice = answer;
      this.invoiceItemList = this.individualInvoice.items;
      this.itemListDataSource.data = this.invoiceItemList;
      this.isLoaded = true;
    });

  }

  private createForm() {
    this.itemsForm = new FormGroup({
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }
  getInvoice(id: any) {

    return this.invoiceService.getInvoice(id);
  }

  addItem() {

    if (Object.keys(this.itemsForm.value.item).length != 0) {
      this.invoiceItemList.push(this.itemsForm.value.item)
      this.itemListDataSource.data = this.invoiceItemList;
    }
  }

  send() {


    this.individualInvoice.items=this.invoiceItemList;

      this.invoiceService.updateInvoice(this.individualInvoice.identifier, this.individualInvoice).subscribe(response => {
        this.itemsForm.reset(); 
        this.individualInvoice = response;
      }
      );

  }

  removeItem(item: Item) {

    const itemIndex = this.invoiceItemList.indexOf(item)
    if (itemIndex != -1) {

      this.invoiceItemList.splice(itemIndex, 1);

      this.itemListDataSource.data = this.invoiceItemList;

    }
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }
}

