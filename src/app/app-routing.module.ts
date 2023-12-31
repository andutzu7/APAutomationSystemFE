import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatePurchaseOrderComponent } from "./components/pages/purchase-orders/create-purchase-order/create-purchase-order.component";
import { ViewPurchaseOrderComponent } from "./components/pages/purchase-orders/view-purchase-order/view-purchase-order.component";
import { ViewPurchaseOrdersComponent } from "./components/pages/purchase-orders/view-purchase-orders/view-purchase-orders.component";
import { CreateInvoiceComponent } from "./components/pages/invoices/create-invoice/create-invoice.component";
import { InvoiceRenderer } from "./components/pages/invoices/invoice-renderer/invoice-renderer.component";
import { LoginComponent } from "./components/pages/auth/login/login.component";
import { RegisterComponent } from "./components/pages/auth/register/register.component";
import { rolesGuard } from "./helpers/roles.guard";
import { ViewInvoicesComponent } from "./components/pages/invoices/view-invoices/view-invoices.component";
import { ViewUsersComponent } from "./components/pages/auth/view-users/view-users.component";
import { ViewCompaniesComponent } from "./components/pages/companies/view-companies/view-companies.component";
import { CreateCompaniesComponent } from "./components/pages/companies/create-companies/create-companies.component";
import { ViewCompaniesTaxComponent } from "./components/pages/companies/view-companies-tax/view-companies-tax.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'users', component: ViewUsersComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'companies', component: ViewCompaniesComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'company', component: CreateCompaniesComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'taxes', component: ViewCompaniesTaxComponent, canActivate: [rolesGuard], data: { expectedRoles: ['ADMIN'] } },
  { path: 'purchase-order', component: CreatePurchaseOrderComponent, canActivate: [rolesGuard], data: { expectedRoles: ['BUYER_CUSTOMER'] } },
  { path: 'purchase-orders/:id', component: ViewPurchaseOrderComponent, canActivate: [rolesGuard], data: { expectedRoles: ['BUYER_CUSTOMER', 'SUPPLIER_ACCOUNTING', 'SUPPLIER_MANAGEMENT'] } },
  { path: 'purchase-orders', component: ViewPurchaseOrdersComponent, canActivate: [rolesGuard], data: { expectedRoles: ['BUYER_CUSTOMER', 'SUPPLIER_ACCOUNTING', 'SUPPLIER_MANAGEMENT'] } },
  { path: 'invoices/create', component: CreateInvoiceComponent, canActivate: [rolesGuard], data: { expectedRoles: ['SUPPLIER_ACCOUNTING'] } },
  { path: 'invoices/view', component: ViewInvoicesComponent, canActivate: [rolesGuard], data: { expectedRoles: ['BUYER_FINANCE', 'SUPPLIER_ACCOUNTING'] } },
  { path: 'invoices/view/:id', component: InvoiceRenderer, canActivate: [rolesGuard], data: { expectedRoles: ['BUYER_FINANCE', 'SUPPLIER_ACCOUNTING'] } }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
