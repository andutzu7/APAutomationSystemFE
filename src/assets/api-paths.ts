export enum ApiPaths {
    //base = 'https://api.pseudot.org/api',
    base = 'http://Backen-LoadB-8St9bQblQWNp-382557083.us-east-1.elb.amazonaws.com/api',
    // base = 'http://localhost:8080/api',
    getInvoicesMapping = 'invoices',
    postInvoicesMapping = 'invoices',
    putInvoicesMapping = 'invoices',
    createInvoiceFromBody = '',
    createInvoiceFromOR = 'invoices/fromOR',
    getInvoiceTax = 'invoices/companyTax',
    getInvoicesTotalTax = 'invoices/totalTax',


    ordersMapping = 'orders',
    companiesMapping = 'companies',
    authMapping = "users",
    loginMapping = "login",
    getOrdersTax = 'orders/companyTax',
    getOrdersTotalTax = 'orders/totalTax',
    registerMapping = "register"
 }
