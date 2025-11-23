export function randomRange_int(min: number, max: number): number {
   if (min === undefined && max === undefined) throw 'Arguments "Min" and "Max" was not called!';
   return Math.floor( Math.random() * (max - min + 1) +  min );
}