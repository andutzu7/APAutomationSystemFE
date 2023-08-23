import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private httpClient: HttpClient){
      this.userSubject = new BehaviorSubject(
        JSON.parse(localStorage.getItem('user')!)
      );

      this.user = this.userSubject.asObservable();
  } 


  login(username: string, password: string){
    return this.httpClient
  }
}
