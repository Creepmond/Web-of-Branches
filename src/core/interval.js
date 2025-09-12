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
      .add( Study([1,0]).effect.dividedBy(tickrate)
         .times( Study([2,0.5]).effect )
      )
});