import { Injectable } from "@angular/core";
import { OrderRequest, OrderResponse } from "../models/order";
import { HttpClient, HttpHeaders } from '@angular/common/http'
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

    // createPurchaseOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    //     return this.httpClient.post<OrderResponse>(
    //         `${ApiPaths.base}/${ApiPaths.ordersMapping}`,
    //         orderRequest
    //     )
    // }

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

    getOrderFile(fileName: string): Observable<File> {
        const headers = new HttpHeaders().set('Content-Type', 'application/pdf; charset=utf-8');
        const requestOptions: Object = {
          headers: headers,
          responseType: 'blob'
        }

        return this.httpClient.get<File>(
            `${ApiPaths.base}/files/${fileName}`, requestOptions
        )
    }
}