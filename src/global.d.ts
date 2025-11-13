declare global {
   interface Window {
      Decimal: any,
   }
   
   type Constant = number | Decimal
};

export {};