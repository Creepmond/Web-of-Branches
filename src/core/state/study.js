import GameMechanicState from "./mechanic/gamestate.js";
import { DC } from "@/utility/constants.js";

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)
   }

   get name() { return this.data.name }
   get allDerivative() { return this.data.derivative }
   get imperative() { return this.data.imperative }
   get description() { return this.data.description }
   get specify() { return this.data.specify || ""; }
   get cost() { return this.data.cost }

   get isPurchased() {
      return player.studyBoughtBits.hasArray(this.data.id)
   }

   get effect() {
      return this.isPurchased ? this.data.effect : DC.D0;
   }
}

/**
 * See src/core/database/regular-study.js for the standard formatting.
 * Study Coordinates (ID) Legend:
 * @param level - integer, is the y-level of the tree, descending.
 * @param offset - rational, is the x-offset of the tree. Integers are to the width of a Study.
 * @return {Object} - the study state.
 */
const Study = StudyState.createAccessor(GameData.regularStudy);
export default Study;