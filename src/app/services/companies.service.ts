import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import {v4 as uuidv4} from 'uuid';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InvoiceApiPaths } from "src/assets/invoice-api-paths";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService{

    constructor(private httpClient: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getCompaniesMapping}`);
    }
    getInvoice(uuid: string): Observable<Company> {

        return this.httpClient.get<Company>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getCompaniesMapping}/${uuid}`);
    }
    deleteInvoice(uuid: string) {

        return this.httpClient.delete(`${InvoiceApiPaths.base}/${InvoiceApiPaths.getCompaniesMapping}/${uuid}`);

    }
    createInvoice(invoiceDPO: Company) {

        return this.httpClient.post<Company>(`${InvoiceApiPaths.base}/${InvoiceApiPaths.postCompaniesMapping}`, invoiceDPO);
    }
    getAllCompanies(): Company[] {
        return [
            new Company(uuidv4(), "CompanyA"),
            new Company(uuidv4(), "CompanyB"),
            new Company(uuidv4(), "CompanyC"),
            new Company(uuidv4(), "CompanyD"),
        ]
    }
}
