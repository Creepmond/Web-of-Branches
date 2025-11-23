import player from "./player.js";

import EventHub, { GameEvent } from "@/core/state/eventhub.js";
import Seed                    from "@/core/state/seed.js";
import Study                   from "@/core/state/study.js";

import Time from "./state/time.js";

/*
export function setCooldown(handler, duration) {
   const callTime = Date.now();
   setTimeout(tick, player.option.tickrate, handler);

   function tick(handler) {
      handler();

      if (callTime > Date.now() - duration)
         setTimeout(tick, player.option.tickrate, handler);
   };
}
*/

/**
 * Updateloop handler for Vue components that update very often. It's dependent on player tickrate
 * @param {function} handler - Usually just "setUpdateloop(this.update)"
 */
export function setUpdateloop(handler: () => void): ReturnType<typeof setTimeout> {
   return setTimeout(handler, player.option.tickrate);
};

/**
 * Clears the setUpdateloop based on the frameId (intervalId by technicality)
 * @param {Number} frameId
 */
export function clearUpdateloop(frameId: number | null): void {
   if (typeof frameId === 'number') clearTimeout(frameId);
}

export function setGameloop(handler: () => void): void {
   setTimeout(tick, player.option.tickrate, handler);
   
   function tick(handler: () => void): void {
      handler();
      setTimeout(tick, player.option.tickrate, handler);
   };
};

setGameloop(() => {
   const diff = player.option.tickrate;

   // EventHub.dispatch(GameEvent.UPDATE);
   Time.tick(diff);
   
   if (!Study([1,0]).isBought) return;

   Seed.tick(diff);
});