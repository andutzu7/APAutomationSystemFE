export class User {
    identifier: string;
    username: string;
    company: string;
    roles: string[]; 

    constructor(username: string, company: string, roles: string[], identifier: string){
        this.username = username;
        this.company = company;
        this.roles = roles;
        this.identifier = identifier;
    }
}