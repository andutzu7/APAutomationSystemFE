import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToolbarService } from './services/toolbar.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APAFinanceFE';

  constructor(private router: Router, private toolbarService: ToolbarService, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isLoggedIn = this.authService.isUserLoggedIn();
        this.toolbarService.updateLoggedInStatus(isLoggedIn);
        
        let userRoles:string[] = authService.getUserRoles();
        toolbarService.updateUserRoles(userRoles);
      }
    });
  }
}
