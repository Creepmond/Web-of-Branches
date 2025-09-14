import Notation from "./notation.js";
import { isDecimal } from "./typecheck.js";

//# Decimal

window.format = function(value, places = 0, placesUnder1000 = 0) {
   value = isDecimal(value) ? value.floor() : Math.floor(value)

   if (!isDecimal) value = new Decimal(value);
   return Notation.mixedScientific.format(value, places, placesUnder1000, 3);
};

window.formatX = function(value) {
   return `×${format(value)}`;
};

window.formatPassRate = function(value) {
   return `+${format(value)} /s`;
};

window.formatCoord = function(value, value2) {
   return `[${value}, ${value2}]`;
}

//# END - Decimal





//# Strings

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

const unicodePool = acceptedUnicode.flatMap(range => {
   const codePool = [];
   for (let i = range.min; i <= range.max; i++) {
      if (exemptUnicodePool.includes(i)) continue;
      codePool.push(i);
   };
   return codePool;
});

String.prototype.caesarOne = function(shift) {
   const code = this.charCodeAt(0);

   // 'Space' character
   if (code === 32) {
      return String.fromCharCode(32)
   } else {
      const index = unicodePool.indexOf(code);
      if (index === -1) return this;
      if (!shift) shift = Math.randomRange_int(1, unicodePool.length);

      return String.fromCharCode( unicodePool.at(index - shift));
   }
}

/*
! Useless, I think
String.prototype.obfuscateOne = function() {
   const strArray = this.split('');
   const randomIndex = Math.randomRange_int(0, strArray.length - 1);
   strArray[randomIndex] = strArray[randomIndex].caesarOne()

   return strArray.join('');
};
*/

String.prototype.obfuscateAll = function() {
   return this
      .split('')
      .map( char => char.caesarOne() )
      .join('')
}

//# END - Strings