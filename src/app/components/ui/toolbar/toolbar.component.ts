import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn: boolean = false;
  username: string = "";
  company: string = "";

  @Input('sidenav') sidenav: any;

  constructor(private authService: AuthService, private companyService: CompaniesService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.username = this.authService.getUsername();

      if (this.isLoggedIn && this.username != "admin") {
        let companyUUID = this.authService.getUserCompany();
        this.companyService.getCompany(companyUUID).subscribe(
          {
            next: (resp) => {
              this.company = " : " + resp.name;
            },
          }
        );
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
