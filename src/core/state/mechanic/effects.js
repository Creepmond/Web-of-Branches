import { DC } from "@/utility/constants.js";

const Effects = {
   times(...allEffect) {
      let value = DC.D1;
      for (const effect of allEffect) {
         value = value.times(effect);
      }
      return value;
   },
};

export default Effects