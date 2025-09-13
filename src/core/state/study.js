import GameMechanicState from "./mechanic/gamestate.js";
import { DC } from "@/utility/constants.js";

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)
      
      this.isAvailable = false;
      this.imperativeIsBought = false;
   }

   get name() {
      return this.data.name;
   }

   get allDerivative() {
      return this.data.derivative;
   }

   get imperative() {
      return this.data.imperative;
   }

   get description() {
      return this.data.description;
   }

   get specify() {
      return this.data.specify || "";
   }

   get cost() {
      return this.data.cost;
   }

   get effectInfo() {
      return this.data.effect;
   }

   get effect() {
      const effectType = this.data.effect.type;

      switch (effectType) {
         case 'passiveRate': return this.isBought ? this.data.effect.value : DC.D0;
         case 'multiplier': return this.isBought ? this.data.effect.value : DC.D1; 
      }
   }

   purchase() {
      player.studyBoughtBits.addArray(this.id);
   }

   get isBought() {
      return player.studyBoughtBits.hasArray(this.id);
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

Study.allId = function() {
   const all_id = [];
   GameData.regularStudy.forEach(study => {
      all_id.push(study.id);
   });
   return all_id;
};

export default Study;