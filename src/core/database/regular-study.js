import { DC } from "@/utility/constants.js";

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      derivative: [ [1, 0] ],
      description: "Plant the first Seed",
      specify: "Reap the Seed after 8s",
      effect: {
         call() {
            setTimeout( () => { Currency.seed.add(1) }, 8000 )
         },
         type: 'callback',
         target: 'Seed',
      },
      cost: DC.D1,
   },

   {
      name: "Sprout",
      id: [1, 0],
      derivative: [ [2, 0] ],
      description: "Slowly produce Seeds",
      get specify() { return `Increase Seeds rate by ${formatPassRate(1)}` },
      effect: {
         value: DC.D1,
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
      get specify() { return `${formatCoord(1, 0)}'s effect is boosted by ${formatX(3)}` },
      effect: {
         value: DC.D3,
         type: 'multiplier',
         target: 'Seed',
      },
      cost: DC.D15,
   },

   {
      name: `1<span class="sup">st</span> Branch`,
      id: [3, -0.5],
      derivative: [ [4, -1] ],
      description: "Seeds multiplied by a million",
      cost: DC.E3,
   },
   {
      name: `2<span class="sup">nd</span> Branch`,
      id: [3, 0.5],
      derivative: [ [4, 1] ],
      isBranchNode: true,
      description: "Boost seed production",
      get specify() { return `${formatCoord(1, 0)}'s effect is boosted by ${formatX(2)}` },
      effect: {
         value: DC.D2,
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
      specify: `Long press, or Click a Branch with the <div class="c-hotkey">ctrl</div> or <div class="c-hotkey">cmd&#8984;</div> key to toggle respeccing`,
      effect: {
         type: 'unlock',
         target: 'Respec',
      },
      cost: DC.D90,
   },
   
   {
      name: "Thyme is essence",
      id: [5, 1],
      derivative: [],
      description: "Return from a branched node",
      specify: `Click a Branch with the <div class="c-hotkey">ctrl</div> or <div class="c-hotkey">cmd&#8984;</div> key to toggle respeccing`,
      effect: {
         type: 'unlock',
         target: 'Respec',
      },
      cost: DC.D100,
   },
];