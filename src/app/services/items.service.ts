import { Injectable } from "@angular/core";
import { Company } from "../models/company";
import { Item } from "../models/item";
import {v4 as uuidv4} from 'uuid';
import data from '../resources/items.json'

@Injectable({
    providedIn: 'root'
})
export class ItemsService{
    getAllItems(): Item[] {
        return data
    }
}