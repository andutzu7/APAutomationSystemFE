import { Company } from "./company";
import { Item } from "./item";

export class OrderRequest {
    identifier: any;
    buyer: string;
    seller: string;
    items: Item[];
    orderStatus: any;
    version?: number;
    uri!: string | null;

    constructor(identifier: any, buyer: string, seller: string, items: Item[], orderStatus: any, uri: string | null) {
        this.identifier = identifier;
        this.buyer = buyer;
        this.seller = seller;
        this.items = items;
        this.orderStatus = orderStatus;
        this.uri = uri;
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

export class SimpleOrderResponse {
    identifier!: string;
    buyer: string;
    seller: string;
    orderStatus!: string;

    constructor(identifier:string, buyer: string, seller: string) {
        this.identifier = identifier;
        this.buyer = buyer;
        this.seller = seller;
    }
}