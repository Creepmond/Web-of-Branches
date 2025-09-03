import { DC } from '../constants.js'

export const regularStudy = {
   root: {
      name: "The Root",
      coordinate: [0, 0],
      description: "Plant the first Seed",
      cost: DC.D1,
   },

   wait: {
      name: "Grow",
      coordinate: [1, 0],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },

   firstBranch: {
      name: "First Branch",
      coordinate: [2, -0.5],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },
   secondBranch: {
      name: "Second Branch",
      coordinate: [2, 0.5],
      description: "Let the Seeds fall",
      cost: DC.E1,
   },
};