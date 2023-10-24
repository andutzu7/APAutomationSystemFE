import { Injectable } from "@angular/core";
import { OrderRequest, OrderResponse } from "../models/order";
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ApiPaths } from "src/assets/api-paths";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private httpClient: HttpClient) { }
    createPurchaseOrder(orderRequest: FormData): Observable<OrderResponse> {
        return this.httpClient.post<OrderResponse>(
            `${ApiPaths.base}/${ApiPaths.ordersMapping}`,
            orderRequest
        )
    }

    updatePurchaseOrder(identifier: string, orderRequest: OrderRequest) {
        return this.httpClient.put<OrderResponse>(
            `${ApiPaths.base}/${ApiPaths.ordersMapping}/${identifier}`,
            orderRequest
        )
    }

    getPurchaseOrder(id: string): Observable<OrderResponse> {
        return this.httpClient.get<OrderResponse>(
            `${ApiPaths.base}/${ApiPaths.ordersMapping}/${id}`
        )
    }

    getPurchaseOrders(): Observable<OrderResponse[]> {
        return this.httpClient.get<OrderResponse[]>(
            `${ApiPaths.base}/${ApiPaths.ordersMapping}`
        )
    }
}