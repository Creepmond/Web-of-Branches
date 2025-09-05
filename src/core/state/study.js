/**
 * Study Coordinates Legend:
 * [level, offset]
 * @param {Number: Integer} level - is the y-level of the tree, descending.
 * @param {Number: Rational} offset - is the x-offset of the tree. Integers
 * are to the width of a Study.
 * See src/core/database/regular-study.js for the standard formatting.
 */

class StudyState {
   constructor(config) {
      this.config = config;
   }

   get coordinates() {
      return this.config.map(study => study.coordinate);
   }

   get coordinatesLevel() {
      return this.config.map(study => study.coordinate[0]);
   }

   get coordinatesOffset() {
      return this.config.map(study => study.coordinate[1]);
   }

   static createAccessor(gamedata) {
      const accessor = 9;
      return accessor
   }
}

const Study = new StudyState(GameData.regularStudy);
export default Study;

/*
Study([0, 0]).unlock()
Study([0, 3]).tryPurchase()
Study([4, 2]).coordinates
Study([2, 9]).isAvailableForPurchase
Study([5, 1]).type
Study([3, 0]).cost
*/