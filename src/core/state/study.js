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

   get isBranchNode() {
      return this.data.isBranchNode || false
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
      const tickrate = player.option.tickrate;

      switch (effectType) {
         case 'passiveRate': return this.isBought ? this.data.effect.value.div(tickrate) : DC.D0;
         case 'multiplier': return this.isBought ? this.data.effect.value : DC.D1; 
         case 'callback': this.data.effect.call();
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

//! This handler may cause problems for modding? Actually, it'll cause problems for me too in
//! development. Well, I guess only if I have Storage (which I don't lol)
const studyAll_id = function() {
   if (player.hidden.studyAll_id.length > 0)
      return player.hidden.studyAll_id;

   const all_id = [];
   GameData.regularStudy.forEach(study => {
      all_id.push(study.id);
   });
   
   player.hidden.studyAll_id = all_id;
   return all_id
}

Object.defineProperties(Study, {
   allId: { get() { return studyAll_id() } },
});

export default Study;
window.Study = Study;