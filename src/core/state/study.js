import player from "@/core/player.js";

import GameMechanicState from       "@/core/state/mechanic/gamestate.js";
import EventHub, { GameEvent } from "./eventhub.js";

import DC from "@/utility/constants.js";

class StudyState extends GameMechanicState {
   #effect = undefined; // Handled on the getter and setter pair at around Line 37

   constructor(data) {
      super(data)

      this.name = data.name;
      this.derivative = data.derivative;
      this.imperative = undefined; // Handled based on this.derivative
      this.description = data.description;
      this.specify = data.specify || "";
      this.cost = data.cost;
      this.effectInfo = data.effect;

      this.isBranchNode = false; // Handled based on this.derivative

      //// this.isExposed = false;
      this.isAvailable = false;
      this.imperativeIsBought = false;
   }

   get effect() {
      if (this.effectInfo.state !== 'static') return this.#effect;

      switch (this.effectInfo.type) {
         case 'passiveRate': return this.isBought ? this.effectInfo.value : DC.D0;
         case 'multiplier': return this.isBought ? this.effectInfo.value : DC.D1;
         case 'exponent': return this.isBought ? this.effectInfo.value : DC.D1;
         case 'unlock': return this.isBought ? true : false;
      };
   }

   set effect(modelValue) {
      this.#effect = modelValue;
   }

   get isBought() {
      return player.studyBoughtBits.includes( rmRef(this.id) );
   }

   purchase() {
      // Reassignment (for Vue; see '@/component/Tree.vue')
      player.studyBoughtBits = player.studyBoughtBits.concat( rmRef(this.id) );
      player.studyExposedBits.add(this.id);

      if (this.effectInfo.state === 'callback') 
         this.effectInfo.call();

      if (this.effectInfo.state === 'synergy') {
         player.time.bought5x1 = player.time.played;
      }

      //// this.isExposed = true;
   }
}

/**
 * See src/core/database/regular-study.js for the standard formatting.
 * Study Coordinates (ID) Legend:
 * @param level - integer, is the y-level of the tree, descending.
 * @param offset - rational, is the x-offset of the tree. Integers are to the width of a Study.
 * @returns the study state.
 */
const Study = StudyState.createAccessor(GameData.regularStudy);

const Studies = {
   get allId() {
      const all_id = [];
      GameData.regularStudy.forEach(study => {
         all_id.push(study.id);
      });
      
      return all_id
   },

   get canRespec() {
      const readableExposed = [...player.studyExposedBits].map(study => rmRef(study));
      return readableExposed.includes( rmRef([4,1]) );
   },

   respec(study) {
      const initBought = player.studyBoughtBits;
      const diffBought = new Set();

      // This is intenetionally inside an Array, similar to how Study().derivatives are formatted
      // (e.g., [ [3, -0.5], [3, 0.5] ]; or [ [4, 1] ]; or simply just [  ]; if it doesn't have any
      // derivatives
      let targetDerivatives = [ Object.values(study) ];

      do {
        //// if (targetDerivative.length > 1) throw "dude make a special handling for this"
        if (!Study(targetDerivatives[0]).isBought) break;

        diffBought.addArray(targetDerivatives[0]);

        // Reassign targetDerivative into *its* derivatives
      } while ((targetDerivatives = Study(targetDerivatives[0]).derivative) && targetDerivatives[0]);

      const deltaBought = new Set(initBought).difference(diffBought);

      EventHub.dispatch(GameEvent.STUDY_RESPEC_COMMIT, [...deltaBought], initBought);
      // I don't entirely remember if Sets (or any other non-primitive in general) are also based on
      // reference, so I'll directly be calling player here rather than initBought
      player.studyBoughtBits = [...deltaBought];
      player.last.respeccedStudy = [];
   },
};

Studies.allId.forEach(index => {
   const studyDerivatives = Study(index).derivative;

   studyDerivatives.forEach(child => {
      if (studyDerivatives.length >= 2) Study(child).isBranchNode = true;
      Study(child).imperative = index;
   })
});

//* Sets up for Storage. I wonder if there's a better method for this. Perhaps via Vue, but the thing
//  is quite fat in file size already
const exposedStudies = [...player.studyExposedBits];
exposedStudies.forEach(shownStudy => {
   Study(shownStudy).isExposed = true;
})

export default Study;
export { Studies };