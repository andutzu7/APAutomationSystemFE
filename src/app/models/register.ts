import { Roles } from "./roles";

export class RegisterRequest {
    username: string;
    password: string;
    companyIdentifier: string;
    roles: string[];

    constructor(username: string, password: string, companyIdentifier: string, roles: string[]) {
        this.username = username;
        this.password = password;
        this.companyIdentifier = companyIdentifier;
        this.roles = roles;
    }
}