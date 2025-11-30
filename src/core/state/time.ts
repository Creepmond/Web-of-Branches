import Currency from "@/core/mechanic/currency.js";

// The value of time played is at '@/core/mechanic/currency.js'

const Time = {
   tick(diff: Constant) {
      Currency.time.add(diff / 1000);
   },
};

export default Time;