import { Company } from "./company";
import { Item } from "./item";

export class OrderRequest {
    buyer: string;
    seller: string;
    items: Item[];
    version?: number;

    constructor(buyer: string, seller: string, items: Item[]){
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
    }
}

export class OrderResponse {
    identifier!: string;
    buyer!: Company;
    seller!: Company;
    items: Item[];
    orderStatus!: string;
    version: number;

    constructor(buyer: Company, seller: Company, items: Item[], version: number){
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
        this.version = version;
    }
}