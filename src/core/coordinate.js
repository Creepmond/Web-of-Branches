export const userInterface = document.getElementById('ui-dynamic');

export function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}

/**
 * Coordinates Legend:
 * [a, b]
 * @param {Number: Integer} a - is the y-level of the tree, descending.
 * @param {Number: Rational} b - is the x-offset of the tree. Integers
 * are to the width of a Study.
 * the s
 * See src/core/database/regular.js for the standard formatting.
 */

/*
const studyDimensionsWidth = 360;
const studyDimensionsHeight = 250;

let studyCoordinate = [];
Object.values(GameDB.regularStudy).forEach(study => {
   studyCoordinate.push(study.coordinate);
})
console.log(studyCoordinate)
*/