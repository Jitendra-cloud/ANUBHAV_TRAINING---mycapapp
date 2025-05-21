using { mycapapp.db.master, mycapapp.db.transaction } from '../db/data-model';
using { mycapapp.myviews } from '../db/CDSViews';


service CatalogService @(path: 'CatalogService', requires: 'authenticated-user' ) {

    // @readonly
    // @Capabilities : { 
    //     Updatable: false,
    //     Deletable: false
    //  }
    entity EmployeeSet
        @(restrict : [
            { grant: ['READ'], to : 'Viewer', where: 'bankName = $user.BankName' },
            { grant: ['WRITE'], to : 'Editor' }
        ])
     as projection on master.employees;
    
    entity BusinessPartnerSet as projection on master.businesspartner;
    
    entity AddressSet
        @(restrict : [
            { grant: ['READ'], to : 'Viewer', where: 'COUNTRY = $user.Country' }
        ])
     as projection on master.address;
    
    entity POs as projection on transaction.purchaseorder
    actions{
        action boost() returns POs;
    };
    entity POItems as projection on transaction.poitems;

    entity ProductSet as projection on myviews.CDSViews.ProductView;

    function getMostExpensiveOrder() returns POs;

}