import { Company } from "./company";
import { Item } from "./item";

export class InvoiceDTO{

    identifier!: string;
    buyer!: Company;
    seller!: Company;
    items!: Item[];
    taxes!: number;
    totalAmount!: number;
    discountRate!:number;
    finalAmount!:number;
    invoiceStatus!: string;
    version!: number;
    uri!: string;

    constructor(buyer: Company, seller: Company, items: Item[]){
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
    }


}