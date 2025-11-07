import Effect from "./effect.js";

import { isFunction, isNumber, isDecimal, isConstant } from "@/utility/typecheck.js";
import { mapGameData } from "@/utiliy/mapping.js";

export default class GameMechanicState extends Effect {
   constructor(config) {
      if (!config) throw new Error("Must specify config for GameMechanicState");
      super(config.effect, config.cap, config.effectCondition);
      this._config = config;

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
      const accessor = id => index.get(id);
      accessor.index = index;
      return accessor;
   }
}