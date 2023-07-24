import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import {v4 as uuidv4} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService{
    getAllCompanies(): Company[] {
        return [
            new Company(uuidv4(), "CompanyA"),
            new Company(uuidv4(), "CompanyB"),
            new Company(uuidv4(), "CompanyC"),
            new Company(uuidv4(), "CompanyD"),
        ]
    }
}