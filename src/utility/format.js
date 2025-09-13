import Notation from "./notation.js";
import { isDecimal } from "./typecheck.js";

//# Decimal

window.format = function(value, places = 0, placesUnder1000 = 0) {
   value.isDecimal ? value.floor() : Math.floor(value)

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
   {min: 33, max: 126},
   {min: 192, max: 255},
];

const unicodePool = acceptedUnicode.flatMap(range => {
   const codePool = [];
   for (let i = range.min; i <= range.max; i++) {
      codePool.push(i)
   }
   return codePool;
})

const poolSize = unicodePool.length

String.prototype.caesar = function(shift = -3) {
   const code = this.charCodeAt(0);

   // 'Space' character
   if (code === 32) {
      return String.fromCharCode(32)
   } else {
      const index = unicodePool.indexOf(code);
      if (index === -1) return this;

      const shiftedIndex = (index + shift) % poolSize;

      return String.fromCharCode( unicodePool[shiftedIndex] );
   }
}

//# END - Strings