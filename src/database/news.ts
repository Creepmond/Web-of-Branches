interface NewsData {
   id: number,
   type: 'always' | 'locked',
   unlocked?: () => boolean,
   flip: (() => string) | string,
}

const news: NewsData[] = [
   {
      id: 1,
      type: "always",
      // Due to how I structured Vue"s Metapanel, this is News Ticker is always the first to appear
      get flip() { return `You've opened this game ${0} times now.`; },
   },
   {
      id: 2,
      type: "always",
      flip: "And this one is the SECOND news ticker",
   },
   {
      id: 3,
      type: "always",
      flip: "However, it is the THIRD news ticker they saw",
   },
   
];

export default news;