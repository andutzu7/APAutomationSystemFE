import { Company } from "./company";
import { Item } from "./item";

export class OrderRequest {
    identifier: any;
    buyer: string;
    seller: string;
    items: Item[];
    orderStatus: any;
    version?: number;

    constructor(identifier: any, buyer: string, seller: string, items: Item[], orderStatus: any) {
        this.identifier = identifier;
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
        this.orderStatus = orderStatus;
    }
}

export class OrderResponse {
    identifier!: string;
    buyer!: Company;
    seller!: Company;
    items: Item[];
    orderStatus!: string;
    version: number;
    uri!: string;

    constructor(buyer: Company, seller: Company, items: Item[], version: number, uri: string) {
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
        this.version = version;
        this.uri = uri;
    }
}