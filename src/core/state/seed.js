import Currency from "@/core/state/mechanic/currency.js";
import Study from "./study.js";
import Timespan from "./timespan.js";

import Effects from "@/core/state/mechanic/effects.js";
import DC from "@/utility/constants.js";

// Hm, this looks like it probably can be a general Class——I'll leave as is for now, but when
// Currencies like Shards or Strings get added it'll probably useful. It's only really because
// I'm not sure how the structure of those Currencies would be a tick why I'm holding out (and
// of course laziness) (and simply because I haven't seen AD use this kind of structure)
const Seed = {
   get passiveRate() {
      return Study([1,0]).effect;
   },

   get multipliers() {
      return Effects.times(
         Study([2, 0]).effect,
         Study([3, 0.5]).effect,
         Timespan.study5x1Effect(),
      )
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
      }
   },

   /*
   get gainPerSec() {
      return this.passiveRate
         .times(this.multipliers)
         .pow(this.exponents)
         .div(this.boundarySlowdown)
   },
   */

   tick() {
      Currency.seed.add(
         this.passiveRate.div(1000 / player.option.tickrate)
         .times(this.multipliers)
         .pow(this.exponents)
         .div(this.boundarySlowdown)
      );
   },
};

export default Seed;