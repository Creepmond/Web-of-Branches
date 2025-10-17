// Mama mia! Wowzers! I am so sorry.

const EventHub = {
   _handlers: {},

   on(event, func, target) {
      let handlers = this._handlers[event];

      if (handlers === undefined) {
         handlers = [];
         this._handlers[event] = handlers;
      }

      handlers.push({ func, target });
   },

   offAll(target) {
      for (const handlers of Object.keys(this._handlers)) {
         this._handlers[handlers] = this._handlers[handlers]
         .filter(handler => handler.target !== target);
      }
   },

   dispatch(event, arg) {
      const handlers = this._handlers[event];
      if (!handlers) return;

      handlers.forEach(handler => {
         handler.func(arg);
      })
   },
};

export default EventHub;

export const GAME_EVENT = {
   UPDATE: "UPDATE",

   // Fixed UI
   DELTA_METAPANEL: "DELTA_METAPANEL",

   // Tree UI
   STUDY_PURCHASE: "STUDY_PURCHASE",
   STUDY_AVAILABLE: "STUDY_AVAILALE",
}