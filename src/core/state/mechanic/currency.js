// OK... I have no excuse for this one. Whaddya know I've watched One Piece, piracy is in my blood
import { DC } from "@/utility/constants.js";

/**
 * @class
 */
class Currency {
   get value() { throw new Error("Currency 'value' is not implemented") }
   set value(value) { throw new Error("Currency 'value' is not implemented" ) }

   get startingValue() { return DC.D0 }

   set(amount) {
      this.value = new Decimal(amount);
   }

   add(amount) {
      this.value = this.value.add(amount);
   }

   sub(amount) {
      this.value = this.value.sub(amount);
   }

   mult(amount) {
      this.value = this.value.mul(amount);
   }

   div(amount) {
      this.value = this.value.div(amount);
   }

   pow(amount) {
      this.value = this.value.pow(amount);
   }

   eq(amount) {
      return this.value = this.value.eq(amount);
   }

   gt(amount) {
      return this.value = this.value.gt(amount);
   }

   gte(amount) {
      return this.value = this.value.gte(amount);
   }

   lt(amount) {
      return this.value = this.value.lt(amount);
   }

   lte(amount) {
      return this.value = this.value.lt(amount);
   }

   bumpTo(value) {
      this.value = Decimal.max(this.value, value);
   }

   dropTo(value) {
      this.value = Decimal.min(this.value, value);
   }

   reset() {
      this.value = this.startingValue;
   }
}

window.Currency = Currency;