import player from "@/core/player.js";

import Currency from "@/core/mechanic/currency.js";

import DC from "@/utility/constants.js";

// The value of time played is at '@/core/mechanic/currency.js'

export const Time = {
   tick(diff) {
      Currency.time.add(diff / 1000);
   },
};