import DC from "@/utility/constants.js";

// I think this should be Utility, as I haven't been able to make an Effect class, singular. Effects work
// aggragating instances of Effect (in AD). I'll either migrate or make effect.js, whichever may fit better
const Effects = {
   sum(...allEffect) {
      let value = DC.D1;
      for (const effect of allEffect) {
         value = value.add(effect);
      }
      return value;
   },

   times(...allEffect) {
      if (allEffect[0].eq(0)) return DC.D0;

      let value = DC.D1;
      for (const effect of allEffect) {
         value = value.times(effect);
      }
      return value;
   },
};

export default Effects