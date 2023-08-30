import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APAFinanceFE';

  constructor(private router: Router, private authService: AuthService) {
    if (!authService.isUserLoggedIn()) {
      router.navigate(['login']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isLoggedIn = this.authService.isUserLoggedIn();
        this.authService.updateLoggedInStatus(isLoggedIn);
        
        let userRoles:string[] = authService.getUserRoles();
        this.authService.updateUserRoles(userRoles);
      }
    });
  }
}
