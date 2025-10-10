//! After finishing this, remove ALL (except Utilities, I think that one makes sense) global properties.
//  I don't think what AD was doing was good practice, anyway

import Study from "./study.js";

import DC from "@/utility/constants.js";

export default class Timespan {
   // I have a bad feeling with what I'm doing lol... this seems very terrible
   static study5x1Effect() {
      const delta = player.time.played.sub(player.time.bought5x1);
      const root = DC.D5.div(delta.add(5));
      const value = DC.D15.pow(root);
      
      Study([5,1]).effect = value;
      return value;
   }
};