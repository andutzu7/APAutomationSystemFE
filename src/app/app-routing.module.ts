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

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'purchase-order', component: CreatePurchaseOrderComponent },
    { path: 'purchase-orders/:id', component: ViewPurchaseOrderComponent },
    { path: 'purchase-orders', component: ViewPurchaseOrdersComponent },
    { path: 'invoices/create', component: CreateInvoiceComponent },
    { path: 'invoices/view', component: InvoicesHandlerComponent},
    { path: 'invoices/view/:id', component: InvoiceRenderer }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
