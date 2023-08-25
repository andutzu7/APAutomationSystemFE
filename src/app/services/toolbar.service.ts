import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSubject.asObservable();

  updateLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  updateUserRoles(roles: string[]) {
    this.userRolesSubject.next(roles);
  }
}
