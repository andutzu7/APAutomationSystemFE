import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiPaths } from "src/assets/api-paths";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    constructor(private httpClient: HttpClient) { }

    getCompany(uuid: string): Observable<Company> {

        return this.httpClient.get<Company>(`${ApiPaths.base}/${ApiPaths.companiesMapping}/${uuid}`);
    }

    deleteCompany(uuid: string) {

        return this.httpClient.delete(`${ApiPaths.base}/${ApiPaths.companiesMapping}/${uuid}`);

    }

    createCompany(company: Company) {

        return this.httpClient.post<Company>(`${ApiPaths.base}/${ApiPaths.companiesMapping}`, company);
    }

    getCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(
            `${ApiPaths.base}/${ApiPaths.companiesMapping}`
        )
    }

}