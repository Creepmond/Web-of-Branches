import player from "@/core/player.js";

import { isSet } from "@/utility/typecheck";

function classPointer(_, value) {
   if ( isSet(value) ) return { _type: 'Set', _value: [...value] };

   return value;
}

function classReader(_, data) {
   if (data && data._type === 'Set') return new Set(data._value);
   if (typeof data !== 'string') return data;

   // Weird data, because it's either a Decimal, or an actual String... I have no clue if this is the best
   // way of doing this. Neither do I have any clue how many times I've been self-deprecating for these
   // kinds of solutions either. Darn me scooby-doo

   let weirdData = undefined;
   
   try {
      weirdData = new Decimal(data);
   } catch {
      weirdData = data;
   } finally {
      if (isNaN(weirdData.mantissa)) return data;
      return weirdData;
   };
};

function setPlayer() { return JSON.stringify(player, classPointer); }
function getPlayer(location) { return JSON.parse(location, classReader) }



const GameStorage = {
   save() {
      localStorage.setItem("webSave", setPlayer());
   },
   load() {
      const serializedObject = getPlayer( localStorage.getItem("webSave") );

      //! This doesn't extend to deeply nested keys, so modifying those things cause problems. I reckon
      //  probably using an API that deals with these kinds of things, but for now... what works, works

      //! Oh yeah, oops. If you purchase [0, 0], save, then wait out the eight seconds... I'm pretty
      //  sure you basically softlock yourself from the game lol

      const allSerializedKeys = [];
      Object.keys(serializedObject).forEach(key => { allSerializedKeys.push(key) })
      
      const allPlayerKeys = [];
      Object.keys(player).forEach(key => { allPlayerKeys.push(key) })

      for (const key of allPlayerKeys) {
         if ( !allSerializedKeys.includes(key) ) continue;
         player[key] = serializedObject[key];
      }
   },
   hardReset() {

   },
};

export default GameStorage; 