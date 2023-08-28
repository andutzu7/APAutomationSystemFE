import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn: boolean = false;
  userRoles: string[] = [];

  constructor(private authService:AuthService){
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.userRoles$.subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  logout(){
    this.authService.logout()
  }
}
