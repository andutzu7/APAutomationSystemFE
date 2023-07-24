import { Injectable } from "@angular/core";
import { Order } from "../models/order";
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService{
    constructor(private httpClient: HttpClient){}

    createPurchaseOrder(orderRequest: Order): Observable<Order>{
        return this.httpClient.post<Order>(
            "http://localhost:8080/api/orders",
            orderRequest
        )
    }



}