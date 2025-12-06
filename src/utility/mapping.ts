import { isFunction, isString } from "./typecheck.js";

/**
 * Sets up objects to include property "name" as the name, for exporting anything and expecting it to be
 * globally available with 'merge-global.ts'
 */
export default function setupMergeGlobal(toExport: object | string, exportName: string): void {
   if (isFunction(exportName)) throw '"setupMergeGlobal" does not support functions as first argument'
   if (!Object.isFrozen(toExport)) {
      (toExport as any).name = exportName;
   }
}

// This is slightly incorrect in the assumption that the return type is an Object. It's actually a Map
export function mapGameData<T extends { id: unknown }, V>(
   gameData: T[],
   mapFn: (v: T) => V
): Map<string, V> {
   const config = new Map();
   for (const data of gameData) {
      const key = JSON.stringify(data.id);
      config.set(key, mapFn(data));
   }
   return config;
}