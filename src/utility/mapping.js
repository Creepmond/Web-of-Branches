export function mapGameData(gameData, mapFn) {
   const config = new Map();
   for (const data of gameData) {
      const key = JSON.stringify(data.id);
      config.set(key, mapFn(data));
   }
   return config;
}