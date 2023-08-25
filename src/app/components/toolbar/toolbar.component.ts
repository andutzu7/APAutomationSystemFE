import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn: boolean = false;
  userRoles: string[] = [];

  constructor(private toolbarService:ToolbarService, private authService:AuthService){
  }

  ngOnInit(): void {
    this.toolbarService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.toolbarService.userRoles$.subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  logout(){
    this.authService.logout()
  }
}
