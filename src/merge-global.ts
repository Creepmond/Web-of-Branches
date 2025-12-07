import { isObject } from "@/utility/typecheck.js";

type ModuleData<T = unknown> = Record<string, T> & {
  default?: T;
  [Symbol.toStringTag]?: "Module";
};

function mergeGlobal(modules: ModuleData | Record<string, ModuleData>): void {
   function mergeDefault() {
      const defaultModule: ModuleData = modules;
      const name: string = defaultModule?.name === undefined ? defaultModule : defaultModule.name;
      (window as any)[name] = defaultModule;
   };

   for (const exportedFile of Object.values(modules)) {
      if (!isObject(exportedFile)) throw '"exportedFile" should not expect a non-object variable';
      if ((exportedFile as any)?.[Symbol.toStringTag] !== 'Module') {
         mergeDefault();
         return;
      };
      for (const exportedSymbol of Object.values(exportedFile)) {
         const name = exportedSymbol?.name === undefined ? exportedSymbol : exportedSymbol.name;
         (window as any)[name] = exportedSymbol;
      };
   };
};

import utility from "@/utility";
mergeGlobal(utility);

import database from "@/database";
mergeGlobal(database);

import mechanic from "@/core/mechanic";
mergeGlobal(mechanic);

import state from "@/core/state";
mergeGlobal(state);

import core from "@/core";
mergeGlobal(core);