export enum ApiPaths {
    //base = 'https://api.pseudot.org/api',
    // base = 'http://Backen-LoadB-PzUPwprA1U3e-1301876444.us-east-1.elb.amazonaws.com/api',
    base = 'http://localhost:8080/api',
    getInvoicesMapping = 'invoices',
    postInvoicesMapping = 'invoices',
    putInvoicesMapping = 'invoices',
    createInvoiceFromBody = '',
    createInvoiceFromOR = 'invoices/fromOR',
    getInvoiceTax = 'invoices/tax',

    ordersMapping = 'orders',
    companiesMapping = 'companies',
    authMapping = "users",
    loginMapping = "login",
    getOrdersTax = 'orders/tax',
    registerMapping = "register"
 }