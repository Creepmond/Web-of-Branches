export function isFunction(value: any): value is Function {
   return typeof value === "function";
}

export function isNumber(value: any): value is number {
   return typeof value === "number";
}

export function isDecimal(value: any): value is Decimal {
   return value instanceof Decimal;
}

export function isConstant(value: any): value is Constant {
   return isNumber(value) || isDecimal(value);
}

export function isSet(value): value is Set<any> {
   return value instanceof Set;
}