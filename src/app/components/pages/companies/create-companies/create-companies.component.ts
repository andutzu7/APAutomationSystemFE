import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css']
})
export class CreateCompaniesComponent {
  loading: boolean = false;
  newCompanyForm: FormGroup;

  constructor(
    private router: Router,
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar) {
    this.newCompanyForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required])
    });
  }

  submit() {
    this.loading = true;

    let name: string = this.newCompanyForm.value.name;
    let newCompany = new Company("", name);

    this.companiesService
      .createCompany(newCompany)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/companies');
        },
        error: (e) => {
          console.log(e.error)
        }
      })
  }
}
