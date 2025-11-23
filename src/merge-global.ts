//! As far as I can tell... this might be difficult to get the exact properties I want it to have. I can't figure
//  out the name of an Object -- so I can't make a placeholder variable name for export defaults

// The "modules" parameter is actually an instanceof "Module", but I don't think TypeScript recognizes that
// so it's just an "any"
function mergeGlobal(modules: any): void {
   // There are two ways an exporting module aggregates content — either using the regular export default with
   // a non-primitive variable acting as a medium, or an export default that exports with a direct Object. The
   // latter can be recognizable if the obj[Symbol.toStringTag] === 'Module'
   const defaultModule = modules.default ?? null;
   if (!defaultModule) throw `An index file should have an export default, instead got: ${modules}`;

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

import * as utility from "@/utility/index.js";
mergeGlobal(utility);

import * as database from "@/database/index.js";
mergeGlobal(database);

import * as mechanic from "@/core/mechanic/index.js";
mergeGlobal(mechanic);

import * as state from "@/core/mechanic/index.js";
mergeGlobal(state);

import * as core from "@/core/index.js";
mergeGlobal(core);