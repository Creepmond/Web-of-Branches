// The "modules" parameter is actually an instanceof "Module", but I don't think TypeScript recognizes that
// so it's just an "any"
function mergeGlobal(modules: any) {
   const defaults = modules.default ?? null;
   if (defaults !== null) {
      for (const exported in defaults) {
         window[exported] = defaults[exported];
      }
   }

   console.log(modules)
};

import * as utility from "@/utility/index.js";
mergeGlobal(utility);

import * as database from "@/database/index.js";
mergeGlobal(database);