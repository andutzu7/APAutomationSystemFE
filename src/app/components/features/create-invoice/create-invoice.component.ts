import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { Router } from '@angular/router';
import { InvoiceDPO } from 'src/app/models/invoiceDPO';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from 'src/app/services/invoice.service';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {

  fromPO: boolean = false;
  companies!: Company[];
  items!: Item[];
  invoiceItemList: Item[] = [];
  public itemsTableDataSource = new MatTableDataSource();
  public selectedOrder!: Order;


  public columnsToDisplay = ['itemNameColumn', 'priceColumn', 'itemQuantityColumn', 'deleteColumn'];
  displayedColumns: string[] = ['identifier', 'buyer', 'seller', 'status'];

  orderForm !: FormGroup;
  error: boolean = false;

  purchaseOrdersDataSource!: MatTableDataSource<Order>

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private itemsService: ItemsService,
    private ordersService: OrdersService,
    private companiesService: CompaniesService,
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.items = this.itemsService.getAllItems();
    this.getPurchaseOrders();
    this.createForm();
  }

  getPurchaseOrders(): void {
    this.ordersService.getPurchaseOrders().subscribe(answer => {
      this.purchaseOrdersDataSource = new MatTableDataSource<Order>(answer);
    });

  }
  private createForm() {
    this.orderForm = new FormGroup({
      buyer: new FormControl<Company>({}, [Validators.required]),
      seller: new FormControl<Company>({}, [Validators.required]),
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }
  getCompanies() {
    this.companiesService.getCompanies().subscribe(answer => {

      this.companies = answer;

    })

  }

  addItem() {

    if (Object.keys(this.orderForm.value.item).length != 0) {
      this.invoiceItemList.push(this.orderForm.value.item)
    }
    this.itemsTableDataSource.data = this.invoiceItemList;
  }

  onSubmit() {
    const newInvoice = this.orderForm.value;

    if (newInvoice.buyer.companyIdentifier == null || newInvoice.seller.companyIdentifier == null || newInvoice.item.description == null) {
      this.error = true;
    }
    else {
      this.error = false;

      const invoiceDPO: InvoiceDPO = new InvoiceDPO(newInvoice.buyer.companyIdentifier, newInvoice.seller.companyIdentifier, this.invoiceItemList);

      this.invoiceService.createInvoice(invoiceDPO).subscribe(response => {
        this.router.navigateByUrl('/invoices/view/' + response.identifier);
      }
      )
    }

  }
  sendInvoiceFromOR() {

    if (this.selectedOrder != null) {
      this.invoiceService.createInvoiceFromPO(this.selectedOrder).subscribe(response => {
        this.router.navigateByUrl('/invoices/view/' + response.identifier);
      });
    }
  }
  toggleForm() {
    this.fromPO = !this.fromPO;
  }
  toggleSelectedPO(order: Order) {
    this.selectedOrder = order;
  }
  removeItem(item: Item) {
    const itemIndex = this.invoiceItemList.indexOf(item)
    if (itemIndex != -1) {

      this.invoiceItemList.splice(itemIndex, 1);


      this.itemsTableDataSource.data = this.invoiceItemList;
    }
  }

}
