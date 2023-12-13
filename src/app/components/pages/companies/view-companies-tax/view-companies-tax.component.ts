import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view-companies-tax',
  templateUrl: './view-companies-tax.component.html',
  styleUrls: ['./view-companies-tax.component.css']
})
export class ViewCompaniesTaxComponent {
  panelOpenState = false;
  companies: Company[] = [];
  selectedMonth!: number;
  selectedYear!: number;
  companiesInvoicesTax!: any;
  companiesOrdersTax!: any;
  companiesTaxMap!: any;

  constructor(
    private companiesService: CompaniesService,
    private ordersService: OrdersService,
    private invoicesService: InvoiceService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getCompanies();

    const now = new Date();
    this.selectedMonth = now.getMonth() + 1;
    this.selectedYear = now.getFullYear();

    this.computeCompaniesTax();
  }

  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      resp => {
        this.companies = resp;

        this.initializeTaxMap();
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
  initializeTaxMap() {
    this.companiesTaxMap = new Map(this.companies.map(obj => [obj.companyIdentifier, { name: obj.name }]));
  }
  computeCompaniesTax() {

    this.initializeTaxMap();

    this.invoicesService.getInvoicesTotalTaxAmount(this.selectedMonth, this.selectedYear).subscribe(response => {

      this.companiesInvoicesTax = response;

      this.updateTaxMap(this.companiesInvoicesTax, "invoice")

    });
    this.ordersService.getOrdersCompanyTaxAmount(this.selectedMonth, this.selectedYear).subscribe(response => {

      this.companiesOrdersTax = response;

      this.updateTaxMap(this.companiesOrdersTax, "purchaseOrder")

    });
  }


  updateTaxMap(companyTaxObject: any, taxTarget: string) {

    if (companyTaxObject.length > 0) {
      for (let index = 0; index < companyTaxObject.length; index++) {
        let element = companyTaxObject.at(index);
        if (this.companiesTaxMap.get(element.companyUUID) != null) {
          let updatedTaxProfile;
          if (taxTarget == "invoice") {
            updatedTaxProfile = Object.assign(this.companiesTaxMap.get(element.companyUUID), { "invoiceStatusTax": element.invoiceStatusTaxPairs });
          }
          if (taxTarget == "purchaseOrder") {
            updatedTaxProfile = Object.assign(this.companiesTaxMap.get(element.companyUUID), { "orderStatusTax": element.orderStatusTaxPairs });
          }
          this.companiesTaxMap[element.companyUUID] = updatedTaxProfile
        }
      }

    }
  }
  parseInputDate(selection: string) {
    if (Number(selection) >= 1 && Number(selection) <= 12) {
      this.selectedMonth = Number(selection);
    } else {
      this.selectedYear = Number(selection);
    }
    this.computeCompaniesTax();
  }

  getPurchaseOrderTax(companyIdentifier: string): number {

    const companyTaxMap = this.companiesTaxMap.get(companyIdentifier).orderStatusTax;
    if (companyTaxMap != undefined) {
      const taxAmount = companyTaxMap.reduce((sum: number, element: any) => sum + element.taxAmount, 0)
      return taxAmount
    } else {
      return 0.0
    }
  }
  getInvoiceTax(companyIdentifier: string): number {

    const companyTaxMap = this.companiesTaxMap.get(companyIdentifier).invoiceStatusTax;
    if (companyTaxMap != undefined) {
      const taxAmount = companyTaxMap.reduce((sum: number, element: any) => sum + element.taxAmount, 0)
      return taxAmount
    } else {
      return 0.0
    }

  }

  getPurchaseOrderTransactionString(companyIdentifier: string): string {

    const companyTaxMap = this.companiesTaxMap.get(companyIdentifier).orderStatusTax;
    if (companyTaxMap != undefined) {

      companyTaxMap.sort(function (elem1: any, elem2: any) {

        return elem1.orderStatus.localeCompare(elem2.orderStatus)
      });
      const statusString = companyTaxMap.reduce((transactionString: string, element: any) => transactionString + `${element.orderStatus} : ${element.taxAmount} | `," | ")
      return statusString
    } else {
      return "-"
    }
  }

  getInvoiceTransactionString(companyIdentifier: string): string {

    const companyTaxMap = this.companiesTaxMap.get(companyIdentifier).invoiceStatusTax;
    if (companyTaxMap != undefined) {

      companyTaxMap.sort(function (elem1: any, elem2: any) {

        return elem1.invoiceStatus.localeCompare(elem2.invoiceStatus)
      });
      const statusString = companyTaxMap.reduce((transactionString: string, element: any) => transactionString + `${element.invoiceStatus} : ${element.taxAmount} | `," | ")
      return statusString
    } else {
      return "-"
    }
  }
}


