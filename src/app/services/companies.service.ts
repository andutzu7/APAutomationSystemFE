import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import {v4 as uuidv4} from 'uuid';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiPaths } from "src/assets/api-paths";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService{
    constructor(private httpClient: HttpClient) { }

    // getCompanies(): Observable<Company[]> {
    //     return this.httpClient.get<Company[]>(`${ApiPaths.base}/${ApiPaths.getCompaniesMapping}`);
    // }
    getInvoice(uuid: string): Observable<Company> {

        return this.httpClient.get<Company>(`${ApiPaths.base}/${ApiPaths.companiesMapping}/${uuid}`);
    }
    deleteInvoice(uuid: string) {

        return this.httpClient.delete(`${ApiPaths.base}/${ApiPaths.companiesMapping}/${uuid}`);

    }
    createInvoice(invoiceDPO: Company) {

        return this.httpClient.post<Company>(`${ApiPaths.base}/${ApiPaths.companiesMapping}`, invoiceDPO);
    }
 
    getCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(
            `${ApiPaths.base}/${ApiPaths.companiesMapping}`
        )
    }

}