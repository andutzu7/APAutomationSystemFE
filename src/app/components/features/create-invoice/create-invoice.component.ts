import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Company } from 'src/app/models/company';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent {

  companies!: Company[]
  items!: Item[]

  orderForm !: FormGroup
  error: boolean = false;

  constructor(
    private router: Router,
    private companiesService: CompaniesService,
    private itemsService: ItemsService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.companies = this.companiesService.getAllCompanies()
    this.items = this.itemsService.getAllItems()

    this.createForm();
  }

  private createForm() {
    this.orderForm = new FormGroup({
      buyer: new FormControl<Company>({}, [Validators.required]),
      seller: new FormControl<Company>({}, [Validators.required]),
      item: new FormControl<Item>({}, [Validators.required]),
      quantity: new FormControl<number>(1, [Validators.required])
    });
  }


  onSubmit() {
    const newOrder = this.orderForm.value;

    if (newOrder.buyer.companyIdentifier == null || newOrder.seller.companyIdentifier == null || newOrder.item.description == null) {
      this.error = true;
    }
    else {
      this.error = false;

      const newItem = newOrder.item;
      newItem.quantity = newOrder.quantity;

      const orderItems :Item[] = [newItem];
      const orderPayload : Order = new Order(newOrder.buyer, newOrder.seller, orderItems)

      this.ordersService.createPurchaseOrder(orderPayload).subscribe(response => {
        this.router.navigateByUrl('/purchase-order/'+response.identifier);
      }
      )
    }

  }
}
