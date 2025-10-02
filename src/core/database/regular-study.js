import { DC } from "@/utility/constants.js";

// Very very terrible handling with derivative, imperative, and isBranch. I would have hoped to
// instead compress all three to just derivative as that's the only one you'd fairly need,
// but '../state/study.js' unfortunately is structured to make looking at the other instances too difficult
// lest optimization hazards come in. FYI my laptop's battery does not like things too unoptimized. I
// guess it's a task for me when I'm better at structuring (or that I get enough headaches)

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      derivative: [ [1, 0] ],
      imperative: [],
      description: "Plant the first Seed",
      specify: "Reap the Seed after 4s",
      effect: {
         call() {
            setTimeout( () => { Currency.seed.add(35) }, 400 )
         },
         type: 'callback',
         target: 'Seed',
      },
      cost: DC.D1,
   },

   {
      name: "Sprout",
      id: [1, 0],
      derivative: [ [2, -0.5], [2, 0.5] ],
      imperative: [0, 0],
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
      name: `1<span class="sup">st</span> Branch`,
      id: [2, -0.5],
      derivative: [ [3, -1] ],
      imperative: [1, 0],
      isBranchNode: true,
      description: "Seeds multiplied by a million",
      cost: DC.E3,
   },
   {
      name: `2<span class="sup">nd</span> Branch`,
      id: [2, 0.5],
      derivative: [ [3, 1] ],
      imperative: [1, 0],
      isBranchNode: true,
      description: "Boost seed production",
      get specify() { return `${formatCoord(1, 0)}'s effect is boosted by ${formatX(3)}` },
      effect: {
         value: DC.D3,
         type: 'multiplier',
         target: 'Seed',
      },
      cost: DC.D7,
   },

   {
      name: "I love trees",
      id: [3, -1],
      derivative: [],
      imperative: [2, -0.5],
      description: "Mr. Beast gives YOU a million",
      cost: DC.E100,
   },
   {
      name: "Leaf Behind",
      id: [3, 1],
      derivative: [ [4, 1] ],
      imperative: [2, 0.5],
      description: "Return from a branched node",
      specify: `Click a Branch with the <div class="c-hotkey">ctrl</div> or <div class="c-hotkey">cmd&#8984;</div> key to toggle respeccing`,
      effect: {
         type: 'unlock',
         target: 'Respec',
      },
      cost: DC.D25,
   },

   {
      name: "Sprout 3",
      id: [4, 1],
      derivative: [],
      imperative: [3, 1],
      description: "Sprout 2",
      cost: DC.E1E15,
   },
];