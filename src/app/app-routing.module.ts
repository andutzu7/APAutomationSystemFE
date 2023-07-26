import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatePurchaseOrderComponent } from "./components/create-purchase-order/create-purchase-order.component";
import { CreateInvoiceComponent } from "./components/create-invoice/create-invoice.component";
import { ViewInvoicesComponent } from "./components/view-invoices/view-invoices.component";

const routes: Routes = [
    { path: 'purchase-order', component: CreatePurchaseOrderComponent },
    { path: 'invoices/create', component: CreateInvoiceComponent},
    { path: 'invoices/view', component: ViewInvoicesComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}