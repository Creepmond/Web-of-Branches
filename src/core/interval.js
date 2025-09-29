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
export function setUpdateloop(handler) {
   return setTimeout(handler, player.option.tickrate);
};

/**
 * Clears the setUpdateloop based on the frameId (intervalId by technicality)
 * @param {Number} frameId
 */
export function clearUpdateloop(frameId) {
   if (typeof frameId === 'number') clearTimeout(frameId);
}

export function setGameloop(handler) {
   setTimeout(tick, player.option.tickrate, handler);
   
   function tick(handler) {
      handler();
      setTimeout(tick, player.option.tickrate, handler);
   };
};

setGameloop(() => {
   if (Study([1,0]).effect) {
      const tickrate = player.option.tickrate;

      Seed.tick();
   };
});