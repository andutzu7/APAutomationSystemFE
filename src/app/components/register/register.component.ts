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

  registerForm!: FormGroup;
  companies!: Company[];
  roles!:string[];

  constructor(private authService: AuthService,
    private companiesService: CompaniesService,
    private rolesService: RolesService) { }

  ngOnInit() {
    this.createForm();
    this.initCompanies();
    this.initRoles();
  }

  private createForm() {
    this.registerForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      companyUUID: new FormControl<string>('', [Validators.required]),
      userRoles: new FormControl<string[]>([], [Validators.required])
    });
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


  submit(){
    console.log(this.registerForm.value)
  }
}
