import { DC } from '../../utility/constants.js'

export const regularStudy = [
   {
      name: "The Root",
      coordinate: [0, 0],
      prerequisite: "none",
      description: "Plant the first Seed",
      cost: DC.D1,
   },

   {
      name: "Grow",
      coordinate: [1, 0],
      prerequisite: [0, 0],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },

   {
      name: "First Branch",
      coordinate: [2, -0.5],
      prerequisite: [1, 0],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },
   {
      name: "Second Branch",
      coordinate: [2, 0.5],
      prerequisite: [1, 0],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },
];