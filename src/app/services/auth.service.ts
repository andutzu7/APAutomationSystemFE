import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from "src/assets/api-paths";
import { LoginRequest, LoginResponse } from '../models/login';
import { shareReplay, tap } from 'rxjs/operators';
import { RegisterRequest } from '../models/register';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router:Router) {
  }


  register(username: string, password: string, company: string, roles: string[]) {
    let registerRequest: RegisterRequest = new RegisterRequest(username, password, company, roles);

    return this.httpClient.post<RegisterRequest>(
      `${ApiPaths.base}/${ApiPaths.authMapping}/${ApiPaths.registerMapping}`,
      registerRequest
    )
  }

  login(username: string, password: string) {
    let loginRequest: LoginRequest = new LoginRequest(username, password);

    console.log(loginRequest)
    return this.httpClient.post<LoginResponse>(
      `${ApiPaths.base}/${ApiPaths.authMapping}/${ApiPaths.loginMapping}`,
      loginRequest
    ).pipe(
      tap(res => {
        this.setSession(res)
      }),
      shareReplay()
    );
  }


  private setSession(loginResponse: LoginResponse) {
    console.log(loginResponse)
    localStorage.setItem('jwt', loginResponse.jwsToken)
  }


  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login')
  }

  public isUserLoggedIn():boolean{
    if(localStorage.getItem('jwt')){
      return true;
    }

    return false;
  }
}
