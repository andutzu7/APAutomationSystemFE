import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { OrderRequest } from 'src/app/models/order';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {
  companies!: Company[];
  items!: Item[];
  buyerCompany!: Company;

  orderForm !: FormGroup
  error: boolean = false;

  constructor(
    private router: Router,
    private companiesService: CompaniesService,
    private itemsService: ItemsService,
    private ordersService: OrdersService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.getCompanies();
    this.items = this.itemsService.getAllItems()


    this.createForm();
  }


  private createForm() {
    this.orderForm = new FormGroup({
      buyer: new FormControl<string>("", [Validators.required]),
      seller: new FormControl<string>("", [Validators.required]),
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }


  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      resp => {
        this.companies = resp;

        const buyerIdentifier = this.authService.getUsersCompany();
        this.buyerCompany = this.companies.filter(company => company.companyIdentifier == buyerIdentifier)[0];
      });
  }


  onSubmit() {
    const newOrder = this.orderForm.value;

    if (newOrder.buyer == '' || newOrder.seller == '' || newOrder.item.description == null) {
      this.error = true;
    }
    else {
      this.error = false;

      const newItem = newOrder.item;
      newItem.quantity = newOrder.quantity;

      const orderItems: Item[] = [newItem];
      const orderPayload: OrderRequest = new OrderRequest(null, newOrder.buyer, newOrder.seller, orderItems, null)

      this.ordersService.createPurchaseOrder(orderPayload).subscribe(
        response => {
          this.router.navigateByUrl('/purchase-orders/' + response.identifier);
        }
      )
    }

  }
}
