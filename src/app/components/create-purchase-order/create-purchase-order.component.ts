import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {
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
      this.ordersService.createPurchaseOrder(newOrder).subscribe(response => {
        this.router.navigateByUrl('/');

        console.log(response)
      }
      )
    }

  }
}
