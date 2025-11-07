export function isFunction(value) {
   return typeof v === "function";
}

export function isNumber(value) {
   return typeof v === "number";
}

export function isDecimal(value) {
   return value instanceof Decimal;
}

export function isConstant(value) {
   return isNumber(v) || isDecimal(v);
}

export function isSet(value) {
   return value instanceof Set;
}