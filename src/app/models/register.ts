import { Roles } from "./roles";

export class RegisterRequest {
    username: string;
    password: string;
    company: string;
    roles: string[];

    constructor(username: string, password: string, company: string, roles: string[]) {
        this.username = username;
        this.password = password;
        this.company = company;
        this.roles = roles;
    }
}