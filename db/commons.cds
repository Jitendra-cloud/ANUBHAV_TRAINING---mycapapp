namespace mycapapp.commons;

using { Currency } from '@sap/cds/common';


   type Gender : String(1) enum{
    male = 'M';
    female = 'F';
    undisclosed = 'U';
   };

   aspect Amount : {
    CURRENCY : Currency;
    GROSS_AMOUNT : AmountT;
    NET_AMOUNT : AmountT;
    TAX_AMOUNT : AmountT;
   }

   type AmountT : Decimal(10, 2) @(
    semantics.amount.currencycode : 'CURRENCY_code',
    sap.unit : 'CURRENCY_code'
   );
   
   type Guid : String(32);

   type PhoneNumber : String(30) @assert.format : '/^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/';

   type EmailAddress : String(255); //@assert.format : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
    
   

