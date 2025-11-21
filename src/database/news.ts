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
      get flip() { return `You've opened this game ${1} time now.`; },
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
   {
      id: 4,
      type: "always",
      flip: "This is an unnecessarily extensive piece of text that does not contribute anything to the game but solely exists to waste your time and lose out on some glorious pieces of other texts. Unfortunately, the length of this ticker is actually a hundred and fifty-two words long. And you've only managed to read fifty-four words in the text, counting words with hyphens as two words. That means there are only eighty leftover words before you can finally escape this ticker. The reason the numbers don't add up isn't because the writer of this text was bad at math &mdash; although it contributes &mdash; but rather because there were extra filler words between the three statistics. Regrettably, this fact doesn't mean this ticker will get any shorter, and there are still twenty-two words left to go. It's only sad to say because there won't be any more tickers to waste your time.",
      // This the numbers are counted BEFORE the number is placed. Meaning the first "fifty-four words"
      // mentioned is outside of the statistics. I couldn't figure out how to convey that. But it's also
      // because I'm too lazy to improve it
   },
   {
      id: 4,
      type: "always",
      flip: "Hovering on me pauses slows the text!",
   },
];

export default news;