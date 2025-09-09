import Notation from "./notation.js";
import { isDecimal } from "./typecheck.js";

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