import GameMechanicState from './gamestate.js'

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data)
   }
   
}

/**
 * Study Coordinates Legend:
 * [level, offset]
 * @param {number: Integer} level - is the y-level of the tree, descending.
 * @param {number: Rational} offset - is the x-offset of the tree. Integers
 * are to the width of a Study.
 * See src/core/database/regular-study.js for the standard formatting.
 * @return {Object} - the study state.
 */
const Study = StudyState.createAccessor(GameData.regularStudy);
export default Study;