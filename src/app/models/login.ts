export class LoginRequest{
    username: string;
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}


export class LoginResponse{
    jwsToken: string;

    constructor(jwsToken:string){
        this.jwsToken = jwsToken;
    }
}