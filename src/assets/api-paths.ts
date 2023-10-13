export enum ApiPaths {
    //base = 'https://api.pseudot.org/api',
    base = 'http://Backen-LoadB-trxy0ysamSy6-1916069205.us-east-1.elb.amazonaws.com/api',
    //base = 'http://localhost:8080/api',
    getInvoicesMapping = 'invoices',
    postInvoicesMapping = 'invoices',
    putInvoicesMapping = 'invoices',
    createInvoiceFromBody = '',
    createInvoiceFromOR = 'invoices/fromOR',
    // getCompaniesMapping = 'companies',
    // postCompaniesMapping = 'companies',

    ordersMapping = 'orders',
    companiesMapping = 'companies',
    
    authMapping = "users",
    loginMapping = "login",
    registerMapping = "register"
 }