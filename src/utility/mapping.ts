// This is slightly incorrect in the assumption that the return type is an Object. It's actually a Map

export function mapGameData(gameData: any[], mapFn: (v: object) => object): object {
   const config = new Map();
   for (const data of gameData) {
      const key = JSON.stringify(data.id);
      config.set(key, mapFn(data));
   }
   return config;
}