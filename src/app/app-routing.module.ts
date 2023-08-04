import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatePurchaseOrderComponent } from "./components/create-purchase-order/create-purchase-order.component";
import { ViewPurchaseOrderComponent } from "./components/view-purchase-order/view-purchase-order.component";
import { ViewPurchaseOrdersComponent } from "./components/view-purchase-orders/view-purchase-orders.component";
import { CreateInvoiceComponent } from "./components/features/create-invoice/create-invoice.component";
import { InvoicesHandlerComponent } from "./invoices-handler/invoices-handler.component";

const routes: Routes = [
    { path: 'new-purchase-order', component: CreatePurchaseOrderComponent },
    { path: 'purchase-order/:id', component: ViewPurchaseOrderComponent },
    { path: 'purchase-order', component: ViewPurchaseOrdersComponent },
    { path: 'purchase-order', component: CreatePurchaseOrderComponent },
    { path: 'invoices/create', component: CreateInvoiceComponent },
    { path: 'invoices/view', component: InvoicesHandlerComponent},
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }