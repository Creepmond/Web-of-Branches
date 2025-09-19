import { DC } from "../utility/constants.js";

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

      const boundarySlowdown = player.seed.gt('1')
         ? player.seed.pow(0.05)
         : DC.D1;

      Currency.seed.add(
         Study([1,0]).effect
            .times( Study([2,0.5]).effect )
            .div(boundarySlowdown)
      );
   };
});