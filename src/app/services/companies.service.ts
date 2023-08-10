import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import {v4 as uuidv4} from 'uuid';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class CompaniesService{
    private companiesUrl = "http://localhost:8080/api/companies";

    constructor(private httpClient: HttpClient) { }

    getAllCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(
            this.companiesUrl
        )
    }

}