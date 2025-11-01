import EventHub, { GameEvent } from "@/core/state/eventhub.js";

const GameNotify = {
   _notify(text, duration = 5000, colorInfluence) {
      EventHub.dispatch(GameEvent.BEFORE_NOTIFY, text, duration, colorInfluence);
   },
   success(text, dur) {
      this._notify(text, dur, 'influ-succeed')
   },

   warning(text, dur) {
      this._notify(text, dur, 'influ-warning')
   },

   distress(text, dur) {
      this._notify(text, dur, 'influ-distress')
   },
};

export default GameNotify;