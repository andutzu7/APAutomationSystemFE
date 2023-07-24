import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {
  companies!: Company[]
  items!: Item[]

  buyer!: Company
  seller!: Company
  selectedItems !: Item[]
  currentItem !: Item

  constructor(
    private companiesService: CompaniesService, 
    private itemsService: ItemsService,
    private ordersService: OrdersService
    ) { }

  ngOnInit(): void {
    this.companies = this.companiesService.getAllCompanies()
    this.items = this.itemsService.getAllItems()
  }

  onSubmit(){
    console.log("create order")
    console.log(this.buyer)
    //this.ordersService.createPurchaseOrder(orderRequest)
  }
}
