import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Invoice } from "../models/invoice";
import { InvoiceApiPaths } from "src/assets/invoice-api-paths";


@Injectable({
    providedIn: 'root'
})
export class InvoiceService{
    
    constructor(private httpClient: HttpClient){}

    getInvoices(): Observable<Invoice>{
        return this.httpClient.get<Invoice>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getMapping}`);
    }
    getInvoice(uuid:string):Observable<Invoice>{

        return this.httpClient.get<Invoice>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getMapping}/${uuid}`);
    }



}