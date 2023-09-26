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
import { OrdersService } from 'src/app/services/orders.service';
import { OrderResponse } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {

  fromPO: boolean = true;
  companies!: Company[];
  items!: Item[];
  invoiceItemList: Item[] = [];
  public itemsTableDataSource = new MatTableDataSource();
  public selectedOrder!: OrderResponse;


  public columnsToDisplay = ['itemNameColumn', 'priceColumn', 'itemQuantityColumn', 'deleteColumn'];
  displayedColumns: string[] = ['identifier', 'buyer', 'seller', 'status'];

  orderForm !: FormGroup;
  sellerCompany!: Company;
  error: boolean = false;

  purchaseOrdersDataSource!: MatTableDataSource<OrderResponse>

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private itemsService: ItemsService,
    private ordersService: OrdersService,
    private companiesService: CompaniesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.items = this.itemsService.getAllItems();
    this.getFilteredPurchaseOrders();
    this.createForm();
  }

  getFilteredPurchaseOrders(): void {
    this.ordersService.getPurchaseOrders().subscribe(answer => {
      const sellerIdentifier= this.authService.getUserCompany();
      let purchaseOrderFilteredList= answer.filter(purchaseOrder => purchaseOrder.seller.companyIdentifier == sellerIdentifier);
      purchaseOrderFilteredList= purchaseOrderFilteredList.filter(purchaseOrder => purchaseOrder.orderStatus == 'APPROVED')
      this.purchaseOrdersDataSource = new MatTableDataSource<OrderResponse>(purchaseOrderFilteredList);
    });

  }
  private createForm() {
    this.orderForm = new FormGroup({
      buyer: new FormControl<string>("", [Validators.required]),
      seller: new FormControl<string>("", [Validators.required]),
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }
  getCompanies() {
    this.companiesService.getCompanies().subscribe(answer => {

      const sellerIdentifier = this.authService.getUserCompany();
      this.sellerCompany = answer.filter(company => company.companyIdentifier == sellerIdentifier)[0];
      this.companies = answer.filter(company => company.companyIdentifier != sellerIdentifier)

    })

  }

  addItem() {
    if (Object.keys(this.orderForm.value.item).length != 0) {
      const newItem = this.orderForm.value.item;
      newItem.quantity = this.orderForm.value.quantity;

      this.invoiceItemList.push(newItem)
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
         console.log(response)
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
  toggleSelectedPO(order: OrderResponse) {
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
