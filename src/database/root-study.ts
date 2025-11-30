import player from "@/core/player.js";

import Currency from "@/core/mechanic/currency.js";

import Timespan from "@/core/state/timespan.js";

import DC     from "@/utility/constants.js";
import format from "@/utility/format.js";

export interface StudyData {
   name: string,
   id: [number, number],
   derivative: Array<[number, number]>,
   description: string,
   specify: string
   isPermanent?: true, // Uses the nullish coalescing operator (??) to determine as "false", if omitted
   isRespeccable?: false, // Uses double negation (!!) to determine as "false", if omitted
   onPurchased?: () => void,
   effect: (() => Constant) | Constant,
   formatEffect?: (v: Constant) => string,
   cost: Constant,
};

const rootStudy: StudyData[] = [
   {
      name: "The Root but you can't remember",
      id: [0, 0],
      derivative: [ [1, 0] ],
      description: "Plant the first Seed. But this is important because",
      specify: "Reap the Seed after 8s",
      isRespeccable: false,
      onPurchased() {
         setTimeout( () => { Currency.seed.add(this.effect) }, 8000 )
      },
      effect: DC.E4,
      cost: DC.D1,
   },

   {
      name: "Sprout",
      id: [1, 0],
      derivative: [ [2, 0] ],
      description: "Slowly produce Seeds",
      get specify() { return `Increase Seeds rate by ${format.passRate(1, 0, 0)}` },
      isRespeccable: false,
      effect: DC.D1,
      cost: DC.D1,
   },

   {
      name: `Three Trees`,
      id: [2, 0],
      derivative: [ [3, -0.5], [3, 0.5] ],
      description: "Gain multiple seeds at once",
      get specify() { return `Boost Seed passive rate by ${format.mult(3)}` },
      effect: DC.D3,
      cost: DC.D15,
   },

   {
      name: `Off course`,
      id: [3, -0.5],
      derivative: [ [4, -1], [4, 0] ],
      description: "This upgrade does nothing",
      specify: "This upgrade does nothing",
      effect: DC.E6,
      cost: DC.D700,
   },
   {
      name: `2<span class="f-sup">nd</span> Branch`,
      id: [3, 0.5],
      derivative: [ [4, 1] ],
      description: "Boost Seed production",
      get specify() { return `Improve Seed production by ${format.mult(2)}` },
      effect: DC.D2,
      cost: DC.D25,
   },

   {
      name: `Off course`,
      id: [4, -1],
      derivative: [ [5, -1] ],
      description: "This upgrade does nothing",
      specify: "This upgrade does nothing",
      effect: DC.E6,
      cost: DC.D700,
   },
   {
      name: `Nightingale, Nightmantle and Nightmare`,
      id: [4, 0],
      derivative: [],
      description: "Receive a fluctuating multiplier to all resources that does a lot of",
      specify: "This upgrade does nothing",
      effect: DC.E6,
      cost: DC.D700,
   },
   {
      name: "Leaf Behind",
      id: [4, 1],
      derivative: [ [5, 1] ],
      description: "Return from a branched node",
      get specify() { return `Long press, or Click a Branch with the <span class="f-hotkey">ctrl</span> or <span class="f-hotkey">cmd&#8984;</span> key to toggle respeccing. Returns ${format.percent(0.1)} of the cost` },
      isPermanent: true,
      effect: DC.D0_1,
      cost: DC.D90,
   },
   
   {
      name: `Stem Reaper`,
      id: [5, -1],
      derivative: [ ],
      description: "This upgrade does nothing",
      specify: "This upgrade does nothing",
      effect: DC.E6,
      cost: DC.D700,
   },
   {
      name: "Thyme is essence",
      id: [5, 1],
      derivative: [],
      description: "Compost your seeds",
      specify: `Receive a ${format.mult(15)} boost to Seed production that drastically wanes over time`,
      isPermanent: true,
      onPurchased: () => { player.time.bought5x1 = player.time.played },
      // Ignore error
      effect: () => { return DC.D15.pow(10 / Timespan.boughtStudy5x1.add(10)); },
      formatEffect: value => format.mult(value),
      cost: DC.D100,
   },
];

export default rootStudy;