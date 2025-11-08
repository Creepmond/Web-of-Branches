export function isFunction(value) {
   return typeof value === "function";
}

export function isNumber(value) {
   return typeof value === "number";
}

export function isDecimal(value) {
   return value instanceof Decimal;
}

export function isConstant(value) {
   return isNumber(value) || isDecimal(value);
}

export function isSet(value) {
   return value instanceof Set;
}