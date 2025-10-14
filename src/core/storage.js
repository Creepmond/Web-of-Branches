import { isDecimal, isSet } from "@/utility/typecheck";

function classPointer(value) {
   console.log(value)
   if ( isSet(value) ) return { _type: 'Set', _value: [...value] };
   if ( isDecimal(value) ) return { _type: 'Decimal', _value: value };

   return value;
}

function classReader(_, data) {
   if (data._type === 'Set') return new Set(data._value);
   if (data._type === 'Decimal') return new Decimal(data._value);

   return data;
};

const GameStorage = {
   save() {
      localStorage.setItem("webSave", JSON.stringify(player, classPointer));
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