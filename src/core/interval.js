export default function gameloop(handler) {
   setTimeout(tick, player.option.tickrate, handler);
   
   function tick(handler) {
      handler();
      setTimeout(tick, player.option.tickrate, handler);
   };
};

gameloop(() => {
   if (Study([1,0]).effect) {
      const tickrate = player.option.tickrate;

      Seed.tick();
   };
});