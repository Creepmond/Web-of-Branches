export default class GameMechanicState {
   constructor(data) {
      this.data = data;
   }

   get id() {
      return this.data.id;
   }

   static createAccessor(gamedata) {
      const instance = new Map();
      
      const accessor = (id) => {
         const key = rmRef(id)

         if (instance.has(key)) return instance.get(key);

         const data = gamedata.find(obj => rmRef(obj.id) === key);
         if (!data) throw new Error(`No ID found: ${key}`);

         const instanceState = new this(data);
         instance.set(key, instanceState);
         return instanceState;
      };

      return accessor
   }
}