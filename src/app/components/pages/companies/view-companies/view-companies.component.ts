import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent {
  panelOpenState = false;
  companies: Company[] = [];

  constructor(
    private companiesService: CompaniesService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.companiesService.getCompanies().subscribe(
      resp => {
        this.companies = resp;
      });
  }

  removeCompany(identifier: string) {
    this.companiesService.deleteCompany(identifier).subscribe(() => {
      this.showSuccess("Successfully deleted!")
    });
  }

  showSuccess(successMessage: string) {
    let snackBarRef = this.snackBar.open(successMessage, "OK");

    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    })
  }
}


