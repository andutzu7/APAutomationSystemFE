import { Injectable } from "@angular/core";
import { Item } from "../models/item";
import data from 'src/assets/items.json'

@Injectable({
    providedIn: 'root'
})
export class ItemsService{
    getAllItems(): Item[] {
        return data
    }
}