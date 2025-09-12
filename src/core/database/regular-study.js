import { DC } from "../../utility/constants.js";

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      derivative: [ [1, 0] ],
      imperative: [],
      description: "Plant the first Seed",
      specify: "Reap the Seed after 4s",
      effect() { setTimeout() },
      cost: DC.D1,
   },

   {
      name: "Sprout",
      id: [1, 0],
      derivative: [ [2, -0.5], [2, 0.5] ],
      imperative: [0, 0],
      description: "Slowly produce Seeds",
      get specify() { return `Increase Seeds rate by ${formatPassRate(1)}` },
      effect: DC.D1,
      cost: DC.D1,
   },

   {
      name: "1<sup>st</sup> Branch",
      id: [2, -0.5],
      derivative: [ [3, -1] ],
      imperative: [1, 0],
      description: "Seeds multiplied by a million",
      cost: DC.E3,
   },
   {
      name: "2<sup>nd</sup> Branch",
      id: [2, 0.5],
      derivative: [ [3, 1] ],
      imperative: [1, 0],
      description: "Boost seed production",
      get specify() { return `${formatCoord(1, 0)}'s effect is boosted by ${formatX(2)}` },
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
      name: "Sprout 2",
      id: [3, 1],
      derivative: [ [4, 1] ],
      imperative: [2, 0.5],
      description: "Sprout 2",
      cost: DC.E1E15,
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