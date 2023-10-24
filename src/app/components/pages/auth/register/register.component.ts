import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { RolesService } from 'src/app/services/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = false;
  registerForm: FormGroup;
  companies!: Company[];
  roles!: string[];
  userRoles: FormControl = new FormControl<string[]>([], [Validators.required]);

  constructor(private authService: AuthService,
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar,
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
    this.loading = true;

    let username: string = this.registerForm.value.username;
    let password: string = this.registerForm.value.password;
    let companyIdentifier: string = this.registerForm.value.companyIdentifier;
    let userRoles: string[] = this.registerForm.value.userRoles;

    this.authService
      .register(username, password, companyIdentifier, userRoles)
      .subscribe({
        next: () => {
          this.showSuccess("Successfully registered!")
        },
        error: (e) => {
          console.log(e.error)
        }
      })
  }

  showSuccess(successMessage: string) {
    let snackBarRef = this.snackBar.open(successMessage, "OK");

    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    })
  }
}
