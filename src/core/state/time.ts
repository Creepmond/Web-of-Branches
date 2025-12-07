import Currency from "@/core/mechanic/currency.js";

import setupMergeGlobal from "@/utility/mapping.js";

// The value of time played is at '@/core/mechanic/currency.js'

const Time = {
   tick(diff: number) {
      Currency.time.add(diff / 1000);
   },
};

setupMergeGlobal(Time, 'Time');
export default Time;