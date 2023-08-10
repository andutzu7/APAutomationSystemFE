import { Company } from "./company";
import { Item } from "./item";

export class InvoiceDPO{

    identifier!:string;
    buyerId!:string;
    sellerId!:string;
    items!: Item[];
    taxes!: number;
    totalAmount!: number;
    invoiceStatus!: string;

    constructor(buyerId: string, sellerId: string, items: Item[]){
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.items = items;
    }


}