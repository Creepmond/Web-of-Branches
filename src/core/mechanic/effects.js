// Another copy from Antimatter Dimensions
// See 'https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/core/game-mechanics/effects.js';

import DC from "@/utility/constants.js";

function applyEffectsOf(effectSources, applyFn) {
   for (const effectSource of effectSources) {
      if (effectSource === null && effectSource === undefined) continue;
      effectSource.applyEffect(applyFn);
   }
}

const Effects = {
   sum(...effectSources) {
      let result = DC.D0;
      applyEffectsOf(effectSources, v => result = result.add(v));
      return result;
   },

   product(...effectSources) {
      let result = DC.D1;
      applyEffectsOf(effectSources, v => result = result.times(v));
      return result;
   },
};

export default Effects