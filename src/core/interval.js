export default function gameloop(handler) {
   setTimeout(tick, player.option.tickrate, handler);
   
   function tick(handler) {
      handler();
      setTimeout(tick, player.option.tickrate, handler);
   };
};

gameloop(() => {
   const tickrate = player.option.tickrate;

   player.seed = player.seed
      .times(
         Decimal.max(Study([1,0]).effect,1).dividedBy(tickrate).add(1)
      );
});