export function mapGameData(gameData, mapFn) {
   const config = new Map();
   for (const data of gameData) {
      const key = rmRef(data.id);
      config.set(key, mapFn(data));
   }
   return config;
}