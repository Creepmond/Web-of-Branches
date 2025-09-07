import * as ADNotations from "@antimatter-dimensions/notations";

ADNotations.Settings.exponentCommas = { min: 1e3, max: 1e15 };

const Notation = {
   mixedScientific: new ADNotations.MixedScientificNotation(),
   mixedEngineering: new ADNotations.MixedEngineeringNotation(),
   mixedLogarithm: new ADNotations.MixedLogarithmSciNotation(),
   scientific: new ADNotations.ScientificNotation(),
   engineering: new ADNotations.EngineeringNotation(),
   logarithm: new ADNotations.LogarithmNotation(),
   standard: new ADNotations.StandardNotation(),
   letters: new ADNotations.LettersNotation(),
};

export default Notation;