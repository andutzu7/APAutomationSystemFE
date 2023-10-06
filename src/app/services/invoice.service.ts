import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { InvoiceDDO } from "../models/invoiceDDO";
import { InvoiceDTO } from "../models/invoiceDTO";
import { OrderResponse } from "../models/order";
import { InvoiceDPO } from "../models/invoiceDPO";
import { ApiPaths } from "src/assets/api-paths";


@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private httpClient: HttpClient) { }

    getInvoices(): Observable<InvoiceDDO[]> {
        return this.httpClient.get<InvoiceDDO[]>(`${ApiPaths.base}/${ApiPaths.getInvoicesMapping}`);
    }
    getInvoice(uuid: string): Observable<InvoiceDTO> {

        return this.httpClient.get<InvoiceDTO>(`${ApiPaths.base}/${ApiPaths.getInvoicesMapping}/${uuid}`);
    }
    deleteInvoice(uuid: string) {

        return this.httpClient.delete(`${ApiPaths.base}/${ApiPaths.getInvoicesMapping}/${uuid}`);

    }
    createInvoice(invoiceData: FormData) {

        return this.httpClient.post<InvoiceDTO>(`${ApiPaths.base}/${ApiPaths.postInvoicesMapping}`,invoiceData);
    }
    updateInvoice(uuid: string, invoiceDTO: InvoiceDTO) {

        return this.httpClient.put<InvoiceDTO>(`${ApiPaths.base}/${ApiPaths.putInvoicesMapping}/${uuid}`, invoiceDTO);

    }
    createInvoiceFromPO(orderRequest: OrderResponse): Observable<InvoiceDTO> {
        return this.httpClient.post<InvoiceDTO>(`${ApiPaths.base}/${ApiPaths.createInvoiceFromOR}`, orderRequest);
        
    }

}

