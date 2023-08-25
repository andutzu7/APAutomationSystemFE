import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatePurchaseOrderComponent } from "./components/create-purchase-order/create-purchase-order.component";
import { ViewPurchaseOrderComponent } from "./components/view-purchase-order/view-purchase-order.component";
import { ViewPurchaseOrdersComponent } from "./components/view-purchase-orders/view-purchase-orders.component";
import { CreateInvoiceComponent } from "./components/features/create-invoice/create-invoice.component";
import { InvoicesHandlerComponent } from "./components/features/invoices-handler/invoices-handler.component";
import { InvoiceRenderer } from "./components/ui/invoice-renderer/invoice-renderer.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { authGuard } from "./helpers/auth.guard";
import { rolesGuard } from "./helpers/roles.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent, canActivate: [rolesGuard], data:{expectedRoles: ['ADMIN']}  },
    { path: 'purchase-order', component: CreatePurchaseOrderComponent, canActivate: [rolesGuard], data:{expectedRoles: ['BUYER_CUSTOMER']} },
    { path: 'purchase-orders/:id', component: ViewPurchaseOrderComponent, canActivate: [rolesGuard], data:{expectedRoles: ['BUYER_CUSTOMER', 'SUPPLIER_ACCOUNTING', 'SUPPLIER_MANAGEMENT']} },
    { path: 'purchase-orders', component: ViewPurchaseOrdersComponent, canActivate: [rolesGuard], data:{expectedRoles: ['BUYER_CUSTOMER', 'SUPPLIER_ACCOUNTING', 'SUPPLIER_MANAGEMENT']} },
    { path: 'invoices/create', component: CreateInvoiceComponent, canActivate: [rolesGuard], data:{expectedRoles: ['SUPPLIER_ACCOUNTING']} },
    { path: 'invoices/view', component: InvoicesHandlerComponent, canActivate: [rolesGuard], data:{expectedRoles: ['BUYER_FINANCE', 'SUPPLIER_ACCOUNTING']}},
    { path: 'invoices/view/:id', component: InvoiceRenderer, canActivate: [rolesGuard], data:{expectedRoles: ['BUYER_FINANCE', 'SUPPLIER_ACCOUNTING']} },
    //{ path: '', component: AppComponent, canActivate: [authGuard]  }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
