import player from "@/core/player.js";

import Currency                from "@/core/mechanic/currency.js";
import Effects                 from "@/core/mechanic/effects.js";
import GameMechanicState       from "@/core/mechanic/game-mechanic.js";
import GameNotify              from "@/core/notification.js";
import EventHub, { GameEvent } from "./eventhub.js";

import DC             from "@/utility/constants.js";
import format         from "@/utility/format.js";
import { isFunction } from "@/utility/typecheck.js";

class StudyState extends GameMechanicState {
   constructor(data) {
      super(data);

      this.name = data.name;
      this.derivative = data.derivative;
      this.imperative = undefined; // Handled based on this.derivative
      this.description = data.description;
      this.specify = data.specify || "";
      this.cost = data.cost;

      this.onPurchased = data.onPurchased ?? null;
      this.isBranchNode = false; // Handled based on this.derivative

      // Handled on Vue
      //// this.isExposed = false;
      this.isAvailable = false;
      this.imperativeIsBought = false;
   }

   // This is assuming we have different StudyStates. For now, this suffices well
   get currency() {
      return Currency.seed;
   }

   get isBought() {
      return player.studyBoughtBits.includes( rmRef(this.id) );
   }

   get isEffectActive() {
      return this.isBought;
   }

   purchase() {
      this.currency.purchase(this.cost);

      // Reassignment (for Vue; see '@/component/Tree.vue')
      player.studyBoughtBits = player.studyBoughtBits.concat( rmRef(this.id) );
      player.studyExposedBits.add(this.id);

      if (isFunction(this.onPurchased)) this.onPurchased();

      EventHub.dispatch(GameEvent.STUDY_PURCHASE);
      //// this.isExposed = true;
   }
}

const gameDataOfAllStudies = GameData.regularStudy;

/**
 * See src/core/database/regular-study.js for the standard formatting.
 * Study Coordinates (ID) Legend:
 * @param level - integer, is the y-level of the tree, descending.
 * @param offset - rational, is the x-offset of the tree. Integers are to the width of a Study.
 * @returns the study state.
 */
const Study = StudyState.createAccessor(gameDataOfAllStudies);

const Studies = {
   get allId() {
      const all_id = [];
      gameDataOfAllStudies.forEach(study => {
         all_id.push(study.id);
      });
      
      return all_id
   },

   get canRespec() {
      const readableExposed = [...player.studyExposedBits].map(study => JSON.stringify(study));
      return readableExposed.includes( JSON.stringify([4,1]) );
   },

   get refundFactor() {
      return Effects.sum(
         Study([4,1])
      );
   },

   respec(study) {
      const initBought = player.studyBoughtBits;
      const noLongerBought = new Set();

      // This is intenetionally inside an Array, similar to how Study().derivatives are formatted
      // (e.g., [ [3, -0.5], [3, 0.5] ]; or [ [4, 1] ]; or simply just [  ]; if it doesn't have any
      // derivatives
      let targetDerivatives = [ Object.values(study) ];

      do {
        //// if (targetDerivative.length > 1) throw "dude make a special handling for this"
        if (!Study(targetDerivatives[0]).isBought) break;

        noLongerBought.addArray(targetDerivatives[0]);

        // Reassign targetDerivative into *its* derivatives
      } while ((targetDerivatives = Study(targetDerivatives[0]).derivative) && targetDerivatives[0]);

      const diffBought = new Set(initBought).difference ( noLongerBought );
      const refundedAmount = this.refund( noLongerBought );

      EventHub.dispatch(GameEvent.STUDY_RESPEC_COMMIT, refundedAmount, [...diffBought], initBought);
      // I don't entirely remember if Sets (or any other non-primitive in general) are also based on
      // reference, so I'll directly be calling player here rather than initBought
      player.studyBoughtBits = [...diffBought];
      player.last.respeccedStudy = [];
   },

   refund(studyArray) {
      console.log(studyArray)
      //! Needs handler for other Currencies
      //// const currencyToRefund = Study(id).effectInfo.target.toLowerCase();
      let currencyAmount = DC.D0;

      for (const id of studyArray) {
         const studyCost = Study( JSON.parse(id) ).cost;
         console.log(format(studyCost.times(this.refundFactor)), format(this.refundFactor) );
         currencyAmount = currencyAmount.add(studyCost.times(this.refundFactor));
      }

      // Uh... I'm pretty sure this nets extra currencies. Oops.
      GameNotify.success(`Respecced, gained: ${ format(currencyAmount) } Seeds`);
      Currency['seed'].add(currencyAmount);
      return currencyAmount;
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