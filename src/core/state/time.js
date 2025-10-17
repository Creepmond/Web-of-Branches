import player from "@/core/player.js";

import Currency from "@/core/state/mechanic/currency.js";

import DC from "@/utility/constants.js";

export const Time = {
   tick() {
      Currency.time.add(
         DC.D1.div(1000 / player.option.tickrate)
      )
   },
};