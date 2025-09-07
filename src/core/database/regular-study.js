import { DC } from "../../utility/constants.js";

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      imperative: "none",
      description: "Plant the first Seed",
      cost: DC.D0,
   },

   {
      name: "Sprout",
      id: [1, 0],
      imperative: [0, 0],
      description: "Slowly produce Seeds",
      get detail() { return `Increase Seeds rate by ${formatPassRate(1)}` },
      effect: 1,
      cost: DC.D1,
   },

   {
      name: "First Branch",
      id: [2, -0.5],
      imperative: [1, 0],
      description: "Seeds multiplied by a million",
      cost: DC.E3,
   },
   {
      name: "Second Branch",
      id: [2, 0.5],
      imperative: [1, 0],
      description: "More Seeds",
      cost: DC.E2,
   },

   {
      name: "I love trees",
      id: [3, -0.5],
      imperative: [2, -0.5],
      description: "Mr. Beast gives YOU a million",
      cost: DC.E100,
   },
];