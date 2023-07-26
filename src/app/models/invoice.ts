import { Company } from "./company";
import { Item } from "./item";

export class Invoice{

    identifier!: string;
    buyer!: Company;
    seller!: Company;
    items!: Item[];
    taxes!: number;
    totalAmount!: number;

}