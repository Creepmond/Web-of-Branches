// OK... I have no excuse for this one. Whaddya know I've watched One Piece, piracy is in my blood
import player from "@/core/player.js";

import DC from "@/utility/constants.js";

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

// Perhaps it's better to seperate these, as another Currency export, given that by importing a single
// instance would load every single one needlessly. I seriously have no clue why I'm conforming to AD's
// style in the first place. I assume the biggest factor for this choice was given how big the game was...
// but wouldn't that be all the more reason to call for imports? No clue... but now it's influenced a
// random idiot who doesn't dabble in data structures and especially, optimization. Geez
Currency.time = new class extends Currency {
   get value() { return player.time.played; }
   set value(value) { player.time.played = value }
};

Currency.seed = new class extends Currency {
   get value() { return player.seed; }
   set value(value) { player.seed = value }
};

export default Currency;