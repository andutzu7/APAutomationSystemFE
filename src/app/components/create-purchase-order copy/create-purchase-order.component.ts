import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'price', 'quantity'];
  selection = new SelectionModel<Item>(true, []);

  companies!: Company[]
  items!: Item[]

  orderForm !: FormGroup
  dataSource !: MatTableDataSource<Item>

  createdOrder ?: Order = undefined;

  error : boolean = false;

  constructor(
    private companiesService: CompaniesService,
    private itemsService: ItemsService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.companies = this.companiesService.getAllCompanies()
    this.items = this.itemsService.getAllItems()
    this.dataSource = new MatTableDataSource<Item>(this.items);

    this.createForm();
  }

  private createForm() {
    this.orderForm = new FormGroup({
      buyer: new FormControl<Company>({}, [Validators.required]),
      seller: new FormControl<Company>({}, [Validators.required]),
      items: new FormControl<Item[]>([])
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  onSubmit() {
    const newOrder: Order = <Order> this.orderForm.value;
    newOrder.items = this.selection.selected
    
    if(newOrder.buyer.companyIdentifier == null || newOrder.seller.companyIdentifier == null){
        this.error = true;
    }
    else{
      this.error = false;
      this.ordersService.createPurchaseOrder(newOrder).subscribe(response => 
        {
          this.createdOrder = response;
          console.log(this.createdOrder)
        }
      )
    }

  }
}
