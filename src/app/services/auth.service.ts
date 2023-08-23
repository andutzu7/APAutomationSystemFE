import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from "src/assets/api-paths";
import { LoginRequest, LoginResponse } from '../models/login';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
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
    // remove user from local storage and set current user to null
    localStorage.removeItem('jwt');

    // this.router.navigate(['/account/login']);
  }
}
