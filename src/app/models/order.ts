import { Company } from "./company";
import { Item } from "./item";

export class Order {
    identifier!: string;
    buyer: Company;
    seller: Company;
    items: Item[];
    orderStatus!: string;

    constructor(buyer: Company, seller: Company, items: Item[], price: number){
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
    }
}

