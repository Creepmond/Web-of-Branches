// Another copy from Antimatter Dimensions
// See 'https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/core/game-mechanics/effects.js';

function applyEffectsOf(effectSources, applyFn) {
  for (const effectSource of effectSources) {
    if (effectSource !== null && effectSource !== undefined) effectSource.applyEffect(applyFn);
  }
}

const Effects = {
   sum(...effectSources) {
      let result = 0;
      applyEffectsOf(effectSources, v => result += v);
      return result;
   },

   product(...effectSources) {
      let result = 1;
      applyEffectsOf(effectSources, v => result *= v);
      return result;
   },
};

export default Effects