import EffectState from "./effect.js";

import { isFunction, isConstant } from "@/utility/typecheck.js";
import { mapGameData } from "@/utility/mapping.js";

// Blatant copy from AD
// See 'https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/core/game-mechanics/game-mechanics.js';

export default class GameMechanicState extends EffectState {
   constructor(config) {
      if (!config) throw new Error("Must specify config for GameMechanicState");
      super(config.effect, config.cap, config.effectCondition);
      
      this._config = config;
      this.id = config.id;

      if (config.effects === undefined) return;

      this.effects = {};
      for (const key in config.effects) {
         const nested = config.effects[key];
         let effect;
         
         if (isConstant(nested) || isFunction(nested)) {
            effect = new Effect(nested);
         } else {
            effect = new Effect(nested.effect, nested.cap, nested.effectCondition);
         }

         Object.defineProperty(effect, "isEffectActive", {
            configurable: false,
            get: () => this.isEffectActive
         });

         this.effects[key] = effect;
      }
   }

   static createAccessor(gameData) {
      const index = mapGameData(gameData, config => new this(config));
      const accessor = id => index.get(JSON.stringify(id));
      //// .index = index;
      return accessor;
   }
}