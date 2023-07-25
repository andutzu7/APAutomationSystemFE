import { Injectable } from "@angular/core";
import { Order } from "../models/order";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private ordersUrl = "http://localhost:8080/api/orders";

    constructor(private httpClient: HttpClient) { }

    createPurchaseOrder(orderRequest: Order): Observable<Order> {
        return this.httpClient.post<Order>(
            this.ordersUrl,
            orderRequest
        )
    }

    updatePurchaseOrder(identifier: string, orderRequest: Order) {
        return this.httpClient.put<Order>(
            this.ordersUrl + '/' + identifier,
            orderRequest
        )
    }

    getPurchaseOrder(id: string): Observable<Order> {
        return this.httpClient.get<Order>(
            this.ordersUrl + '/' + id
        )
    }


    getPurchaseOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(
            this.ordersUrl
        )
    }
}