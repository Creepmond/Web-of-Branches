import Timespan from "./timespan.js";

import GameMechanicState from "./mechanic/gamestate.js";
import { DC } from "@/utility/constants.js";

const Studies = {
   get allId() {
      const all_id = [];
      GameData.regularStudy.forEach(study => {
         all_id.push(study.id);
      });
      
      return all_id
   },
};

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)

      this.name = data.name;
      this.derivative = data.derivative;
      this.imperative = undefined; // Handled based on this.derivative
      this.description = data.description;
      this.specify = data.specify || "";
      this.cost = data.cost;
      this.effectInfo = data.effect;

      this.isBranchNode = false;

      //// this.isExposed = false;
      this.isAvailable = false;
      this.imperativeIsBought = false;
   }

   get effect() {
      const effect = this.effectInfo;

      switch (effect.type) {
         case 'passiveRate': return this.isBought ? effect.value : DC.D0;
         case 'multiplier': return this.isBought ? effect.value : DC.D1;
         case 'exponent': return this.isBought ? effect.value : DC.D1;
         case 'unlock': return this.isBought ? true : false;
         case 'callback': effect.call(); return DC.D0;
      }
   }

   get isBought() {
      return player.studyBoughtBits.includes( rmRef(this.id) );
   }

   purchase() {
      // Reassignment (for Vue; see '@/component/Tree.vue')
      player.studyBoughtBits = player.studyBoughtBits.concat( rmRef(this.id) );
      player.studyExposedBits.add(this.id);

      if (this.effectInfo.type === 'synergy') player.time.bought5x1 = player.time.played;

      //// this.isExposed = true;
   }
}

/**
 * See src/core/database/regular-study.js for the standard formatting.
 * Study Coordinates (ID) Legend:
 * @param level - integer, is the y-level of the tree, descending.
 * @param offset - rational, is the x-offset of the tree. Integers are to the width of a Study.
 * @returns the study state.
 */
const Study = StudyState.createAccessor(GameData.regularStudy);

Studies.allId.forEach(index => {
   const studyDerivatives = Study(index).derivative;

   studyDerivatives.forEach(child => {
      if (studyDerivatives.length >= 2) Study(child).isBranchNode = true;
      Study(child).imperative = index;
   })
});

// I wonder if there's a better method for this
const exposedStudies = [...player.studyExposedBits];
exposedStudies.forEach(shownStudy => {
   Study(shownStudy).isExposed = true;
})

window.Studies = Studies;
window.Study = Study;