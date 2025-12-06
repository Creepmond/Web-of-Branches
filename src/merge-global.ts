type ModuleData<T = unknown> = Record<string, T> & {
  default?: T;
  [Symbol.toStringTag]?: "Module";
};

function mergeGlobal(modules: ModuleData | Record<string, ModuleData>): void {
   console.log(modules);
   /*
   const defaultModule = modules.default ?? null;
   if (!defaultModule) throw `An index file should have an export default, instead got: ${modules}`;

   */

   //// console.log(defaultModule, modules);
   /*
   if (defaults !== null) {
      for (const exported in defaults) {
         window[exported] = defaults[exported];
      }
   }

      */
   for (const exported in modules) {
      // Skip default, already dealt with
      /*
      if (exported === 'default') continue;
      window[exported] = modules[exported];

      */
   }
};

import utility from "@/utility";
mergeGlobal(utility);

/*
import * as database from "@/database";
mergeGlobal(database);

import * as mechanic from "@/core/mechanic";
mergeGlobal(mechanic);

import * as state from "@/core/state";
mergeGlobal(state);

import * as core from "@/core";
mergeGlobal(core);
*/