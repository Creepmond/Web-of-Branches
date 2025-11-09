//! After finishing this, remove ALL (except Utilities, I think that one makes sense) global properties.
//  I don't think what AD was doing was good practice, anyway
import player from "@/core/player.js";

const Timespan = {
   // I have a bad feeling with what I'm doing lol... this seems very terrible
   get boughtStudy5x1() {
      return player.time.played.sub(player.time.bought5x1);
   }
};

export default Timespan;