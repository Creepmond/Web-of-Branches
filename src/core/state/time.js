import { DC } from "@/utility/constants.js";

Currency.time = new class extends Currency {
   get value() { return player.time.played; }
   set value(value) { player.time.played = value }
};

export const time = {
   tick() {
      Currency.time.add(
         DC.D1.div(1000 / player.option.tickrate)
      )
   },
};