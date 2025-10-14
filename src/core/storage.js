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



const GameStorage = {
   save() {
      localStorage.setItem("webSave", JSON.stringify(player, classPointer));
      console.log( 
         JSON.parse(
            localStorage.getItem("webSave"),
            classReader
         )
      );
   },
   load() {
      player = JSON.parse(
         localStorage.getItem("webSave"),
         classReader
      );
   },
   hardReset() {

   },
};

export default GameStorage;