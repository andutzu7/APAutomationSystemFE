import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { InvoiceDDO } from "../models/invoiceDDO";
import { InvoiceDTO } from "../models/invoiceDTO";
import { Order } from "../models/order";
import { InvoiceDPO } from "../models/invoiceDPO";
import { InvoiceApiPaths } from "src/assets/invoice-api-paths";


@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private httpClient: HttpClient) { }

    getInvoices(): Observable<InvoiceDDO[]> {
        return this.httpClient.get<InvoiceDDO[]>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getInvoicesMapping}`);
    }
    getInvoice(uuid: string): Observable<InvoiceDTO> {

        return this.httpClient.get<InvoiceDTO>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getInvoicesMapping}/${uuid}`);
    }
    deleteInvoice(uuid: string) {

        return this.httpClient.delete(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getInvoicesMapping}/${uuid}`);

    }
    createInvoice(invoiceDPO: InvoiceDPO) {

        return this.httpClient.post<InvoiceDTO>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.postInvoicesMapping}`, invoiceDPO);
    }
    updateInvoice(uuid: string, invoiceDTO: InvoiceDTO) {

        return this.httpClient.put<InvoiceDTO>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.putInvoicesMapping}/${uuid}`, invoiceDTO);

    }
    createInvoiceFromPO(orderRequest: Order): Observable<InvoiceDTO> {
        return this.httpClient.post<InvoiceDTO>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.createInvoiceFromOR}`, orderRequest);
        
    }

}

