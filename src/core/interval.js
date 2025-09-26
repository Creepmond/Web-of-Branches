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