import GameMechanicState from "./mechanic/gamestate.js";
import { DC } from "@/utility/constants.js";

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)

      this.name = data.name;
      this.allDerivative = data.derivative;
      this.imperative = data.imperative;
      this.description = data.description;
      this.specify = data.specify || "";
      this.cost = data.cost;
      this.effectInfo = data.effect;

      this.isBranchNode = data.isBranchNode || false;

      this.isAvailable = false;
      this.imperativeIsBought = false;
   }

   get isBought() {
      return player.studyBoughtBits.hasArray(this.id);
   }

   get effect() {
      const effect = this.effectInfo;

      switch (effect.type) {
         case 'passiveRate': return this.isBought ? effect.value : DC.D0;
         case 'multiplier': return this.isBought ? effect.value : DC.D1;
         case 'exponent': return this.isBought ? effect.value : DC.D1;
         case 'unlock': ; return this.isBought ? true : false;
         case 'callback': effect.call(); return DC.D0;
      }
   }

   purchase() {
      player.studyBoughtBits.addArray(this.id);
      player.studyExposedBits.addArray(this.id);
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

// I forgot, but I realize I probably could just move this to a seperate object "Studies",
// incidentally the same method AD uses
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