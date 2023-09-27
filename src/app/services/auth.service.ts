import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from "src/assets/api-paths";
import { LoginRequest, LoginResponse } from '../models/login';
import { shareReplay, tap } from 'rxjs/operators';
import { RegisterRequest } from '../models/register';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSubject.asObservable();


  constructor(private httpClient: HttpClient, private router: Router) {
  }


  updateLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  updateUserRoles(roles: string[]) {
    this.userRolesSubject.next(roles);
  }

  public register(username: string, password: string, company: string, roles: string[]) {
    let registerRequest: RegisterRequest = new RegisterRequest(username, password, company, roles);

    return this.httpClient.post<RegisterRequest>(
      `${ApiPaths.base}/${ApiPaths.authMapping}/${ApiPaths.registerMapping}`,
      registerRequest
    )
  }

  public login(username: string, password: string) {
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

  public logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login')
    window.location.reload()
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${ApiPaths.base}/${ApiPaths.authMapping}`
    )
  }

  deleteUser(identifier: string){
    return this.httpClient.delete(`${ApiPaths.base}/${ApiPaths.authMapping}/${identifier}`);
  }

  private setSession(loginResponse: LoginResponse) {
    console.log(loginResponse)
    localStorage.setItem('jwt', loginResponse.jwsToken)
  }


  public isUserLoggedIn(): boolean {
    if (localStorage.getItem('jwt')) {
      return true;
    }

    return false;
  }


  public getUserRoles(): string[] {
    if (this.isLoggedIn$) {
      const tokenPayload: { [key: string]: any } = this.getUserToken();
      const userRoles: string[] = tokenPayload['roles'];

      return userRoles;
    }

    return [];
  }


  public getUserCompany(): string {
    if (this.isLoggedIn$) {
      const tokenPayload: { [key: string]: any } = this.getUserToken();
      const companyIdentifier: string = tokenPayload['company'];

      return companyIdentifier;
    }

    return "";
  }

  public getUsername(): string {
    if (this.isLoggedIn$) {
      const tokenPayload: { [key: string]: any } = this.getUserToken();
      const username: string = tokenPayload['sub'];

      return username;
    }

    return ""
  }


  private getUserToken(): { [key: string]: any } {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return {};
    }

    const tokenPayload: { [key: string]: any } = decode(token);
    return tokenPayload;
  }
}


