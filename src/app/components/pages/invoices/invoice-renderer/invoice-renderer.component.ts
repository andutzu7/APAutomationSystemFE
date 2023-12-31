import { Component, Inject } from '@angular/core';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FileTransferService } from 'src/app/services/filetransfer.service';
import { FormGroup } from '@angular/forms';

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
  totalAmount: number = 0;
  public columnsToDisplay = ['descriptionColumn', 'quantityColumn', 'priceColumn', 'deleteColumn'];

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private itemsService: ItemsService,
    private fileTransferService: FileTransferService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.items = this.itemsService.getAllItems();
    this.createForm();
    this.getInvoice(id).subscribe(answer => {

      this.individualInvoice = answer;
      this.invoiceItemList = this.individualInvoice.items;
      this.itemListDataSource.data = this.invoiceItemList;
      this.isLoaded = true;
      this.totalAmount = answer.totalAmount;
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
      const newItem = Object.assign({}, this.itemsForm.value.item);
      newItem.quantity = this.itemsForm.value.quantity;

      this.appendItem(this.invoiceItemList, newItem);

      this.itemListDataSource.data = this.invoiceItemList;
      this.totalAmount = this.computeTotalAmount(this.invoiceItemList);
    }
  }

  appendItem(existingItems: Item[], newItem: Item) {
    let alreadyExistent: boolean = false;

    existingItems.forEach(item => {
      if (item.description == newItem.description) {
        alreadyExistent = true;
        item.quantity! = item.quantity! + newItem.quantity!;
      }
    })

    if (alreadyExistent == false) {
      existingItems.push(newItem);
    }
  }

  changeStatus(invoiceStatus: string) {

    this.individualInvoice.items = this.invoiceItemList;
    this.individualInvoice.invoiceStatus = invoiceStatus;

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
      this.totalAmount = this.computeTotalAmount(this.invoiceItemList);
    }
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  computeTotalAmount(items: Item[]): number {
    let amount = 0;

    items.forEach(item => {
      amount += item.price! * item.quantity!
    })

    return amount;
  }

  downloadInvoice(): void {
    this.fileTransferService.getFile(this.individualInvoice.uri).subscribe(
      {
        next: (resp) => {
          const file = new Blob([resp], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank', 'width=1000, height=800');
          console.log(resp)
        },
      }
    );
  }
}
