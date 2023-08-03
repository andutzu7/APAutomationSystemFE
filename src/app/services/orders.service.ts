import { Injectable } from "@angular/core";
import { OrderRequest, OrderResponse } from "../models/order";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private ordersUrl = "http://localhost:8080/api/orders";

    constructor(private httpClient: HttpClient) { }

    createPurchaseOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
        return this.httpClient.post<OrderResponse>(
            this.ordersUrl,
            orderRequest
        )
    }

    savePurchaseOrder(identifier: string): Observable<OrderResponse> {
        return this.httpClient.patch<OrderResponse>(
            this.ordersUrl + '/' + identifier,
            {}
        )
    }

    updatePurchaseOrder(identifier: string, orderRequest: OrderRequest) {
        return this.httpClient.put<OrderResponse>(
            this.ordersUrl + '/' + identifier,
            orderRequest
        )
    }

    getPurchaseOrder(id: string): Observable<OrderResponse> {
        return this.httpClient.get<OrderResponse>(
            this.ordersUrl + '/' + id
        )
    }


    getPurchaseOrders(): Observable<OrderResponse[]> {
        return this.httpClient.get<OrderResponse[]>(
            this.ordersUrl
        )
    }
}