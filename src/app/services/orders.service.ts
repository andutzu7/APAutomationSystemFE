import { Injectable } from "@angular/core";
import { OrderRequest, OrderResponse, SimpleOrderResponse } from "../models/order";
import { HttpClient, HttpParams } from '@angular/common/http'
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

    getPurchaseOrders(page: number, pageSize:number): Observable<SimpleOrderResponse[]> {
        let params = new HttpParams().set('page', page).append('pageSize', pageSize);

        return this.httpClient.get<SimpleOrderResponse[]>(
            `${ApiPaths.base}/${ApiPaths.ordersMapping}`,
            { params: params }
        )
    }
}