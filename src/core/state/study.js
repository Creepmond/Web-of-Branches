import GameMechanicState from "./mechanic/gamestate.js";

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)
   }
   
   get availability() {
      const isBought = player.studyBoughtBits.has(this.id);
      return isBought ? 'bought' : 'available';
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