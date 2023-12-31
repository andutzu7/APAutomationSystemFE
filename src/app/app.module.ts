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
import { ErrorsInterceptor } from './helpers/errors.interceptor';
import { ViewUsersComponent } from './components/pages/auth/view-users/view-users.component';
import { ViewCompaniesComponent } from './components/pages/companies/view-companies/view-companies.component';
import { CreateCompaniesComponent } from './components/pages/companies/create-companies/create-companies.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DatePickerComponent } from './components/ui/date-picker/date-picker.component';
import { InvoiceService } from './services/invoice.service';
import { ViewCompaniesTaxComponent } from './components/pages/companies/view-companies-tax/view-companies-tax.component';

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
    ViewUsersComponent,
    ViewCompaniesComponent,
    ViewCompaniesTaxComponent,
    CreateCompaniesComponent,
    DatePickerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuyerModule,
    MatPaginatorModule
  ],
  providers: [
    CompaniesService,
    ItemsService,
    InvoiceService,
    OrdersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
