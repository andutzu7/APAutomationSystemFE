import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  userRoles: string[] = [];

  constructor(private authService: AuthService){}

  ngOnInit(): void {

    this.authService.userRoles$.subscribe((roles) => {
      this.userRoles = roles;
    });
  }
}
