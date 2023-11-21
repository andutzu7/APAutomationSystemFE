import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../../../../models/company';
import { CompaniesService } from '../../../../services/companies.service';
import { Item } from '../../../../models/item';
import { ItemsService } from '../../../../services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { OrderRequest } from 'src/app/models/order';
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
  file: File | null = null;
  loading: boolean = false;
  submitEnabled: boolean = true;

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
        const buyerIdentifier = this.authService.getUserCompany();

        this.companies = resp.filter(company => company.companyIdentifier != buyerIdentifier);
        this.buyerCompany = resp.filter(company => company.companyIdentifier == buyerIdentifier)[0];
      });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    this.loading = true;
    const newOrder = this.orderForm.value;

    if (newOrder.buyer == '' || newOrder.seller == '' || newOrder.item.description == null || this.file == null) {
      this.error = true;
    }
    else {
      this.error = false;
      this.submitEnabled = false;

      const newItem = newOrder.item;
      newItem.quantity = newOrder.quantity;

      const orderItems: Item[] = [newItem];
      const orderPayload: OrderRequest = new OrderRequest(null, newOrder.buyer, newOrder.seller, orderItems, null, null)

      let input = new FormData();
      input.append('file', this.file!, this.file!.name);
      input.append('order', new Blob([JSON.stringify(orderPayload)], {
        type: "application/json"
      }));

      this.ordersService.createPurchaseOrder(input).subscribe(
        response => {
          this.router.navigateByUrl('/purchase-orders/' + response.identifier);
        }
      )
    }
  }
}
