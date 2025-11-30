import Decimal from "break_infinity.js";

declare global {
   interface Window {
      
   }
   
   type Constant = number | Decimal
}

export {};