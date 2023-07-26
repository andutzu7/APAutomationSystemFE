export class Company {
    companyIdentifier?: string;
    name?: string;

    constructor(companyIdentifier:string, name:string){
        this.companyIdentifier = companyIdentifier;
        this.name = name;
    }
}