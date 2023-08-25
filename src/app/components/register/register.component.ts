import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  companies!: Company[];
  roles!: string[];
  userRoles: FormControl = new FormControl<string[]>([], [Validators.required]);

  constructor(private authService: AuthService,
    private companiesService: CompaniesService,
    private rolesService: RolesService) {
    this.registerForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      companyIdentifier: new FormControl<string>('', [Validators.required]),
      userRoles: this.userRoles
    });
  }

  ngOnInit() {
    this.initCompanies();
    this.initRoles();
  }

  private initCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      resp => {
        this.companies = resp;
      });
  }

  private initRoles(): void {
    this.roles = this.rolesService.getAllRoles();
  }

  getNumberOfSelectedRoles(): number {
    const selectedRoles: string[] = this.registerForm.get('userRoles')?.value || [];
    return selectedRoles.length;
  }

  submit() {
    console.log(this.registerForm.value)
    let username: string = this.registerForm.value.username;
    let password: string = this.registerForm.value.password;
    let companyIdentifier: string = this.registerForm.value.companyIdentifier;
    let userRoles: string[] = this.registerForm.value.userRoles;

    this.authService
    .register(username, password, companyIdentifier, userRoles)
    .subscribe({
      next: () => {
        console.log("Successfully registered new user")
      },
      error: (e) =>{
        console.log(e.error)
      }
    })
  }
}
