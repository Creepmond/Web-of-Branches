export const GameEvent = {
   UPDATE: "UPDATE",

   // Fixed UI
   DELTA_METAPANEL: "DELTA_METAPANEL",
   DELTA_HEADER: "DELTA_HEADER",
   BEFORE_NOTIFY: "BEFORE_NOTIFY",

   // Dynamic UI
   AFTER_MOVE_SCREEN: "MOVE_SCREEN",
   AFTER_ZOOM_SCREEN: "AFTER_ZOOM_SCREEN",

   // Game
   STUDY_PURCHASE: "STUDY_PURCHASE",
   STUDY_AVAILABLE: "STUDY_AVAILALE",
   STUDY_RESPEC_TOGGLE: "STUDY_RESPEC_TOGGLE",
   STUDY_RESPEC_COMMIT: "STUDY_RESPEC_COMMIT",
} as const;

type GameEventData = typeof GameEvent[keyof typeof GameEvent];



type EventHandler<T extends unknown[] = unknown[]> = {
  func: (...args: T) => void;
  target?: any; // Usually the Vue component where it is placed, or any other identification
};

type EventHandlerMap = Partial<Record<GameEventData, EventHandler[]>>;

interface EventHubData {
   _handlers: EventHandlerMap
   on: (event: GameEventData, func: () => void, target: any) => void
   offAll: (target: any) => void
   dispatch: (event: GameEventData, ...args: unknown[]) => void
}

const EventHub: EventHubData = {
   _handlers: {},

   /**
    * Initializes a new function on an event listener
    * @param {GameEventData} event - Accepts only strict strings defined in GameEvent
    * @param {any} target - Usually the Vue component where it is placed, or any other identification
    */
   on(event: GameEventData, func: () => void, target: any) {
      let handlers = this._handlers[event];

      if (handlers === undefined) {
         handlers = [];
         this._handlers[event] = handlers;
      }

      handlers.push({ func, target });
   },

   /**
    * Disables an event listener
    * @param {any} target - Usually the Vue component where it is placed, or any other identification
    */
   offAll(target: any) {
      for (const handlers of Object.keys(this._handlers)) {
         this._handlers[handlers] = this._handlers[handlers]
         .filter(handler => handler.target !== target);
      }
   },

   /**
    * Calls all functions associated with an event listener 
    * @param {GameEventData} event - Accepts only strict strings defined in GameEvent
    */
   dispatch(event: GameEventData, ...args: unknown[]) {
      const handlers = this._handlers[event];
      if (!handlers) return;

      handlers.forEach((handler: EventHandler) => {
         handler.func(...args);
      })
   },
};

export default EventHub;