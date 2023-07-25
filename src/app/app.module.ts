import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { BuyerModule } from './buyer.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CompaniesService } from './services/companies.service';
import { ItemsService } from './services/items.service';
import { OrdersService } from './services/orders.service';
import {  ViewPurchaseOrderComponent } from './components/view-purchase-order/view-purchase-order.component';
import { ViewPurchaseOrdersComponent } from './components/view-purchase-orders/view-purchase-orders.component';
import { NewItemDialogComponent } from './components/new-item-dialog/new-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePurchaseOrderComponent,
    ToolbarComponent,
    ViewPurchaseOrderComponent,
    ViewPurchaseOrdersComponent,
    NewItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuyerModule,
  ],
  providers: [CompaniesService, ItemsService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
