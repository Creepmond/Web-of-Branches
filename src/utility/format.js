import Notation from "./notation.js";

window.format = function(value, places = 0, placesUnder1000 = 0) {
   if (!(value instanceof Decimal)) value = new Decimal(value);
   return Notation.mixedScientific.format(value, places, placesUnder1000, 3);
};