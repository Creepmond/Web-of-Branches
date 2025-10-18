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

   dispatch(event, ...args) {
      const handlers = this._handlers[event];
      if (!handlers) return;

      handlers.forEach(handler => {
         handler.func(...args);
      })
   },
};

export default EventHub;

export const GameEvent = {
   UPDATE: "UPDATE",

   // Fixed UI
   DELTA_METAPANEL: "DELTA_METAPANEL",

   // Dynamic UI
   AFTER_MOVE_SCREEN: "MOVE_SCREEN",

   // Game
   STUDY_PURCHASE: "STUDY_PURCHASE",
   STUDY_AVAILABLE: "STUDY_AVAILALE",
   STUDY_RESPEC_TOGGLE: "STUDY_RESPEC_TOGGLE",
   STUDY_RESPEC_COMMIT: "STUDY_RESPEC_COMMIT",
}