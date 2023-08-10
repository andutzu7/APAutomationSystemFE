import { Company } from "./company";
import { Item } from "./item";

export class InvoiceDTO{

    identifier!: string;
    buyer!: Company;
    seller!: Company;
    items!: Item[];
    taxes!: number;
    totalAmount!: number;
    invoiceStatus!: string;

    constructor(buyer: Company, seller: Company, items: Item[]){
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
    }


}