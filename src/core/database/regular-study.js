import { DC } from "../../utility/constants.js";

export const regularStudy = [
   {
      name: "The Root",
      id: [0, 0],
      prerequisite: "none",
      description: "Plant the first Seed",
      cost: DC.D1,
   },

   {
      name: "Grow",
      id: [1, 0],
      prerequisite: [0, 0],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },

   {
      name: "First Branch",
      id: [2, -0.5],
      prerequisite: [1, 0],
      description: "Seeds multiplied by a million",
      cost: DC.E1,
   },
   {
      name: "Second Branch",
      id: [2, 0.5],
      prerequisite: [1, 0],
      description: "More Seeds",
      cost: DC.E1,
   },

   {
      name: "I love trees",
      id: [3, -0.5],
      prerequisite: [2, -0.5],
      description: "Mr. Beast gives YOU a million",
      cost: DC.E100,
   },
];