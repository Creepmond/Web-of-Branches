import Decimal from "break_infinity.js";



export function isString(value: unknown): value is string {
   return typeof value === "string";
}

export function isFunction(value: unknown): value is Function {
   return typeof value === "function";
}

export function isNumber(value: unknown): value is number {
   return typeof value === "number";
}

export function isDecimal(value: unknown): value is Decimal {
   return value instanceof Decimal;
}

export function isConstant(value: unknown): value is Constant {
   return isNumber(value) || isDecimal(value);
}

export function isSet(value: unknown): value is Set<unknown> {
   return value instanceof Set;
}