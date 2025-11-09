import player from "@/core/player.js";

import Currency from "@/core/mechanic/currency.js";
import Study    from "./study.js";

import Effects from "@/core/mechanic/effects.js";
import DC      from "@/utility/constants.js";

// Hm, this looks like it probably can be a general Class——I'll leave as is for now, but when
// Currencies like Shards or Strings get added it'll probably useful. It's only really because
// I'm not sure how the structure of those Currencies would be a tick why I'm holding out (and
// of course laziness) (and simply because I haven't seen AD use this kind of structure)
const Seed = {
   get passiveRate() {
      return Effects.sum(
         Study([1, 0])
      ).times(Effects.product(
         Study([2, 0])
      ));
   },

   get multipliers() {
      return Effects.product(
         Study([3, 0.5]),
         Study([5, 1  ]),
         Study([3, -0.5]),
      );
   },

   get exponents() {
      return DC.D1;
   },

   get boundarySlowdown() {
      const slowdown = player.seed.sub(999).pow(0.02);

      if (player.hidden.hasEverReachedBoundary) {
         return slowdown;
      } else if ( player.seed.gt('1000') ) {
         player.hidden.hasEverReachedBoundary = true;
         return slowdown;
      } else {
         return DC.D1;
      };
   },

   get gainPerSec() {
      return this.passiveRate
         .times(this.multipliers)
         .pow(this.exponents)
         .div(this.boundarySlowdown)
   },

   gainRateAccountDiff(diff) {
      return this.gainPerSec.times(diff / 1000);
   },

   tick(diff) {
      Currency.seed.add(this.gainRateAccountDiff(diff));
   },
};

export default Seed;