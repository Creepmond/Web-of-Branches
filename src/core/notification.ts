import EventHub, { GameEvent } from "@/core/state/eventhub.js";

const GameNotify = {
   _notify(text: string, duration = 5000, colorInfluence: string) {
      EventHub.dispatch(GameEvent.BEFORE_NOTIFY, text, duration, colorInfluence);
   },
   
   success(text: string, dur?: number) {
      this._notify(text, dur, 'influ-success')
   },

   warning(text: string, dur?: number) {
      this._notify(text, dur, 'influ-warning')
   },

   distress(text: string, dur?: number) {
      this._notify(text, dur, 'influ-distress')
   },
};

export default GameNotify;