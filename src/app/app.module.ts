import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePurchaseOrderComponent } from './components/pages/purchase-orders/create-purchase-order/create-purchase-order.component';
import { BuyerModule } from './buyer.module';
import { ToolbarComponent } from './components/ui/toolbar/toolbar.component';
import { CompaniesService } from './services/companies.service';
import { ItemsService } from './services/items.service';
import { OrdersService } from './services/orders.service';
import { ViewPurchaseOrderComponent } from './components/pages/purchase-orders/view-purchase-order/view-purchase-order.component';
import { ViewPurchaseOrdersComponent } from './components/pages/purchase-orders/view-purchase-orders/view-purchase-orders.component';
import { NewItemDialogComponent } from './components/ui/new-item-dialog/new-item-dialog.component';
import { ViewInvoicesComponent } from './components/pages/invoices/view-invoices/view-invoices.component';
import { InvoiceRenderer } from './components/pages/invoices/invoice-renderer/invoice-renderer.component';
import { CreateInvoiceComponent } from './components/pages/invoices/create-invoice/create-invoice.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { SidenavComponent } from './components/ui/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePurchaseOrderComponent,
    ToolbarComponent,
    ViewPurchaseOrderComponent,
    ViewPurchaseOrdersComponent,
    NewItemDialogComponent,
    ViewInvoicesComponent,
    InvoiceRenderer,
    CreateInvoiceComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuyerModule,
  ],
  providers: [
    CompaniesService, 
    ItemsService, 
    OrdersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
