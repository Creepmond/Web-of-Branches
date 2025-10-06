//! After finishing this, remove ALL (except Utilities, I think that one makes sense) global properties.
//  I don't think what AD was doing was good practice, anyway

import { DC } from "@/utility/constants";

export default class Timespan {
   static get study5x1Effect() {
      const delta = player.time.played.sub(player.time.bought5x1);
      const root = DC.D4.div(delta.add(4));
      return DC.D15.pow(root);
   }
};