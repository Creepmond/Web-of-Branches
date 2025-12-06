import Decimal from "break_infinity.js";



import GameData from "@/database/index.js";
import player   from "@/core/player.js";

import Currency                from "@/core/mechanic/currency.js";
import Effects                 from "@/core/mechanic/effects.js";
import GameMechanicState       from "@/core/mechanic/game-mechanic.js";

import EventHub, { GameEvent } from "./eventhub.js";

import GameNotify              from "@/core/notification.js";

import DC             from "@/utility/constants.js";
import format         from "@/utility/format.js";
import { isFunction } from "@/utility/typecheck.js";

type StudyID = [number, number];

class StudyState extends GameMechanicState {
   readonly name: string
   readonly derivative: StudyID[]
   imperative: StudyID | null // Handled based on this.derivative
   readonly description: string
   readonly specify: string
   readonly cost: Constant

   onPurchased: (() => void) | null
   formatEffect: (() => string) | null
   
   readonly isRespeccable: boolean
   readonly isPermanent: boolean

   isAvailable: boolean
   imperativeIsBought: boolean

   constructor(data: any) {
      super(data);

      this.name = data.name;
      this.derivative = data.derivative
      this.imperative = null; 
      this.description = data.description;
      this.specify = data.specify || "";
      this.cost = data.cost;

      this.onPurchased = data.onPurchased ?? null;
      this.formatEffect = data.formatEffect ?? null;

      this.isRespeccable = data.isRespeccable ?? true;
      this.isPermanent = !!data.isPermanent;

      // Handled on Vue
      //// this.isExposed = false;
      this.isAvailable = false;
      this.imperativeIsBought = false;

      if (this.derivative.includesArray(this.id))
         throw `Study ${format.coord(this.id)} has a derivative of itself, causing an infinite call stack`
   }

   // This is assuming we have different StudyStates. For now, this suffices well
   protected get currency() {
      return Currency.seed;
   }

   get isBought() {
      return player.studyBoughtBits.includes(JSON.stringify(this.id));
   }

   get isExposed() {
      return player.studyExposedBits.hasArray(JSON.stringify(this.id));
   }

   get isEffectActive() {
      return this.isBought || (this.isPermanent && this.isExposed);
   }

   purchase() {
      this.currency.purchase(this.cost);

      // Reassignment (for Vue; see '@/component/Tree.vue')
      player.studyBoughtBits = player.studyBoughtBits.concat(JSON.stringify(this.id));
      player.studyExposedBits.add(this.id);

      if (isFunction(this.onPurchased)) this.onPurchased();

      EventHub.dispatch(GameEvent.STUDY_PURCHASE);
      //// this.isExposed = true;
   }
}

const gameDataOfAllStudies = GameData.rootStudy;

/**
 * See src/core/database/root-study.js for the standard formatting.
 * Study Coordinates (ID) Legend:
 * @param level - integer, is the y-level of the tree, descending.
 * @param offset - rational, is the x-offset of the tree. Integers are to the width of a Study.
 * @returns the study state.
 */
const Study = StudyState.createAccessor(gameDataOfAllStudies);

interface StudiesData {
   respeccedStudy: StudyID | null
   allId: StudyID[]
   canRespec: boolean
   refundFactor: Decimal
   respec: () => void
   refund: (v: string[]) => void
}

const Studies: StudiesData = {
   respeccedStudy: null,

   allId: (function() {
      const all_id: StudyID[] = [];
      gameDataOfAllStudies.forEach(study => {
         all_id.push(study.id);
      });
      
      return all_id
   })(),

   get canRespec() {
      const readableExposed = [...player.studyExposedBits].map(study => JSON.stringify(study));
      return readableExposed.includes( JSON.stringify([4,1]) );
   },

   get refundFactor() {
      return Effects.sum(
         Study([4,1])
      );
   },

   //! This still doesn't account for unbought Studies, so it progressively gets slower with more defined
   //  Studies (not just bought)

   respec() {
      const study = this.respeccedStudy;

      if (study === null) {
         console.warn('Player requested a "Respec" without a respecced Study');
         return;
      }

      const initBought = player.studyBoughtBits;
      const noLongerBought: Set<string> = new Set();

      // The targetDerivative is in fact just one thing — at least for initially — but is treated as an
      // Array to avoid complications
      const targetDerivative: StudyID[] = [study];
      const unresolvedBranch: StudyID[] = [];

      do {
         //* Conditions
         const unfocusedBranch = targetDerivative.toSpliced(0, 1);
         if (unfocusedBranch.length > 0) unresolvedBranch.push(...unfocusedBranch);
         //// if (!Study(targetDerivative[0]).isBought) break;

         //* Effect
         noLongerBought.addArray(targetDerivative[0]);

         //* Reassignment
         let newTarget: StudyID[] = Study(targetDerivative[0])?.derivative ?? null;

         if (newTarget === null) {
            newTarget = [unresolvedBranch[0]];
            unresolvedBranch.splice(0, 1);
         }
         
         targetDerivative.length = 0;
         targetDerivative.push(...newTarget);
      } while (targetDerivative.length > 0 || unresolvedBranch.length > 0);

      const diffBought = new Set(initBought).difference( noLongerBought );
      const refundedAmount = this.refund( noLongerBought );

      this.respeccedStudy = null;
      EventHub.dispatch(GameEvent.STUDY_RESPEC_COMMIT, refundedAmount, [...diffBought], initBought);
      // I don't entirely remember if Sets (or any other non-primitive in general) are also based on
      // reference, so I'll directly be calling player here rather than initBought
      player.studyBoughtBits = [...diffBought];
   },

   refund(studyArray: Set<string>) {
      //! Needs handler for other Currencies
      //// const currencyToRefund = Study(id).effectInfo.target.toLowerCase();
      let currencyAmount = DC.D0;

      for (const id of studyArray) {
         const studyCost = Study( JSON.parse(id) ).cost;
         currencyAmount = currencyAmount.add(studyCost.times(this.refundFactor));
      }

      GameNotify.success(`Respecced, gained: ${ format.int(currencyAmount) } Seeds`);
      Currency['seed'].add(currencyAmount);
      return currencyAmount;
   },
};

for (const index of Studies.allId) {
   const studyDerivatives = Study(index).derivative;

   for (const child of studyDerivatives) {
      const childStudy = Study(child);

      if (childStudy?.imperative === undefined) {
         console.warn(`Study ${format.coord(index)} calls an unidentifiable Study ${format.coord(child)}`);
      } else if (childStudy.imperative === null) {
         childStudy.imperative = index;
      }
   };
};

//* Sets up for Storage. I wonder if there's a better method for this. Perhaps via Vue, but the thing
//  is quite fat in file size already
const exposedStudies = [...player.studyExposedBits];
exposedStudies.forEach(shownStudy => {
   Study(shownStudy).isExposed = true;
})

export default Study;
export { Studies };