import Currency from "@/core/state/mechanic/currency.js";

import DC from "@/utility/constants.js";

//* Effect States: "Static", "Conditional", and "Synergy"; Statics are fixed values. Conditionals are
//  applied on an external *state*—e.g., another Study is bought, or there have only been N purchased
//  studies, usually only available at two to three values (e.g., default, in-effect, another external
//  boost). Synergy is based on an external *variable* or a *mix of variables* via formulas—e.g.,
//  boost based on time played, or based on another resource.

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      derivative: [ [1, 0] ],
      description: "Plant the first Seed",
      specify: "Reap the Seed after 8s",
      // I think I could make the format visible using player.time.played... actually, how am I calling
      // Currency here anyway? Isn't this a loopway dependency? Ts makes me confused
      effect: {
         call() { setTimeout( () => { Currency.seed.add(199) }, 80 ) },
         state: 'callback',
         type: 'passive',
         target: 'Seed',
      },
      cost: DC.D1,
   },

   {
      name: "Sprout",
      id: [1, 0],
      derivative: [ [2, 0] ],
      description: "Slowly produce Seeds",
      get specify() { return `Increase Seeds rate by ${formatPassRate(1, 0, 0)}` },
      effect: {
         value: DC.D1,
         state: 'static',
         type: 'passiveRate',
         target: 'Seed',
      },
      cost: DC.D1,
   },

   {
      name: `Three Trees`,
      id: [2, 0],
      derivative: [ [3, -0.5], [3, 0.5] ],
      description: "Gain multiple seeds at once",
      get specify() { return `Boost Seed passive rate by ${formatX(3)}` },
      effect: {
         // There's still problems with this... but for now, good enough
         value: DC.D3,
         state: 'static',
         type: 'passiveRate',
         target: 'Seed',
      },
      cost: DC.D15,
   },

   {
      name: `1<span class="f-sup">st</span> Branch`,
      id: [3, -0.5],
      derivative: [ [4, -1] ],
      description: "Seeds multiplied by a million",
      effect: {
         value: DC.D2,
         state: 'static',
         type: 'multiplier',
         target: 'Seed',
      },
      cost: DC.D700,
   },
   {
      name: `2<span class="f-sup">nd</span> Branch`,
      id: [3, 0.5],
      derivative: [ [4, 1] ],
      isBranchNode: true,
      description: "Boost Seed production",
      get specify() { return `Improve Seed production by ${formatX(2)}` },
      effect: {
         value: DC.D2,
         state: 'static',
         type: 'multiplier',
         target: 'Seed',
      },
      cost: DC.D25,
   },

   {
      name: "I love trees",
      id: [4, -1],
      derivative: [],
      description: "Mr. Beast gives YOU a million",
      cost: DC.E100,
   },
   {
      name: "Leaf Behind",
      id: [4, 1],
      derivative: [ [5, 1] ],
      description: "Return from a branched node",
      specify: `Long press, or Click a Branch with the <span class="f-hotkey">ctrl</span> or <span class="f-hotkey">cmd&#8984;</span> key to toggle respeccing`,
      effect: {
         state: 'static',
         type: 'unlock',
         target: 'Respec',
      },
      cost: DC.D90,
   },
   
   {
      name: "Thyme is essence",
      id: [5, 1],
      derivative: [],
      description: "Compost your seeds",
      specify: `Receive a ${formatX(15)} boost to Seed production that drastically wanes over time`,
      effect: {
         state: 'synergy',
         type: 'multiplier',
         target: 'Seed',
      },
      cost: DC.D100,
   },
];