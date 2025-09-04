import Study from './state/study.js'

/**
 * Study Coordinates Legend:
 * [level, offset]
 * @param {Number: Integer} level - is the y-level of the tree, descending.
 * @param {Number: Rational} offset - is the x-offset of the tree. Integers
 * are to the width of a Study.
 * the s
 * See src/core/database/regular-study.js for the standard formatting.
 */
const studyDimensionsWidth = 360;
const studyDimensionsHeight = 250;

const studyLevel = Array.range(Study.coordinatesLevel, 1)

console.log(studyLevel);

const userInterface = document.getElementById('ui-dynamic');
userInterface.style.height = `${studyDimensionsHeight * studyLevel}px`;