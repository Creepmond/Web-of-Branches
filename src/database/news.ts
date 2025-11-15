interface NewsData {
   id: number,
   type: 'always' | 'locked',
   unlocked?: () => boolean,
   flip: (() => string) | string,
}

const news: NewsData[] = [
   {
      id: 1,
      type: 'always',
      flip: "The only ticker you'll ever get",
   },
];

export default news;