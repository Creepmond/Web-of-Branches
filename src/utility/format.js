import Decimal from "break_infinity.js";



import setupMergeGlobal              from "./mapping.js";
import { randomRange_int }           from "./math.js";
import Notation                      from "./notation.js";
import { isDecimal, isNumber }       from "./typecheck.js";

/* *******************************************************************************************************
* *******************************************     Decimal     ********************************************
* *******************************************************************************************************/

// The default format is the integers
const format = {
   int(value, places = 2, placesUnder1000 = 0) {
      if (!isDecimal(value)) value = new Decimal(value);

      // Problem with this, this still causes formatting errors when it reaches the point where the
      // notation shifts (e.g., from 1000 to 1 K), in the sense that it doesn't really format to the
      // latter immediately. I think doing a RegEx may apply better in this case
      if (value.lte(-0.5) || value.gte(0.5)) {
         // Here, 0.4 is used rather than 0.5 (for flooring), because it appears like base-format rounds
         // values exactly at 0.5
         const dynamicFloorValue = 10 ** (placesUnder1000 * -1) * 0.4;
         value = value.sub(dynamicFloorValue);
      }

      return Notation.mixedScientific.format(value, places, placesUnder1000, 3);
   },

   // Float by default
   percent(value, places, placesUnder1000 = 1) {
      isDecimal(value) ? value.div(100) : value / 100;
      return `${this.int(value, places, placesUnder1000)}%`;
   },

   // Float by default
   passRate(value, places, placesUnder1000 = 2) {
      return `+${this.int(value, places, placesUnder1000)} /s`;
   },

   // Float by default
   mult(value, places, placesUnder1000 = 2) {
      return `×${this.int(value, places, placesUnder1000)}`;
   },

   // Float by default
   pow(value, places, placesUnder1000 = 2) {
      return `^${this.int(value, places, placesUnder1000)}`;
   },

   coord(value, value2) {
      return value2 ? `[${value}, ${value2}]` : `[${value[0]}, ${value[1]}]`;
   },
};

setupMergeGlobal(format, "format");
export default format;







/* *******************************************************************************************************
* ********************************************     Strings     *******************************************
* *******************************************************************************************************/

/* ###################
* Start: Pluralize *
* ******************/

/**
 * 
 * @param {Constant} value 
 * @returns {boolean}
 */
function isSingular(value) {
   if (isDecimal(value)) return value.eq('1');
   if (isNumber(value)) return value === 1;
   throw new Error(`${value}: is neither Decimal nor Number.`)
}

const pluralChecker = new Map([
   [/$/g, 's'],
]);

/**
 * @param {string} name
 * @param {Constant} target
 * @return {string}
 */
export function pluralize(name, target, newName = null) {
   if (isSingular(target)) return name;
   
   if (newName !== null) return newName;
   for (const checker of pluralChecker.entries()) {
      const newName = name.replace(checker[0], checker[1])
      if (name !== newName) return newName;
   }
   return name;
};

/* *****************
* Close: Pluralize *
#####################*/





/* ##############################
* Start: Character Randomizer *
* *****************************/

const acceptedUnicode = [
   {min: 35, max: 122, except: [
      {min: 39, max: 46},
      {min: 58, max: 62},
      {min: 94, max: 96},
   ]},
   {min: 192, max: 255, except: [
      {min: 204, max: 207},
      {min: 236, max: 239},
   ]},
];

const exemptUnicodePool = acceptedUnicode.flatMap(range => {
   const codePool = [];
   range.except.flatMap(exclusion => {
      for (let i = exclusion.min; i <= exclusion.max; i++) {
         codePool.push(i);
      };
   });
   return codePool;
});

const unicodePool = function() {
   const acceptedPool = acceptedUnicode.flatMap(range => {
      const codePool = [];
      for (let i = range.min; i <= range.max; i++) {
         if (exemptUnicodePool.includes(i)) continue;
         codePool.push(i);
      };
      return codePool;
   });

   return acceptedPool;
};

String.prototype.caesarOne = function(shift) {
   const code = this.charCodeAt(0);

   // 'Space' character
   if (code === 32) {
      return String.fromCharCode(32)
   } else {
      const index = unicodePool().indexOf(code);
      if (index === -1) return this;
      if (!shift) shift = randomRange_int(1, unicodePool().length);

      return String.fromCharCode( unicodePool().at(index - shift));
   }
}

String.prototype.obfuscateAll = function() {
   return this
      .split('')
      .map( char => char.caesarOne() )
      .join('')
}

/* ***************************
* Close: Chracter Randomizer *
###############################*/