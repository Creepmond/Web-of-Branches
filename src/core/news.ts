import news from "@/database/news.js";

import { randomRange_int } from "@/utility/math.js";

const News = {
   available: (function() {
      news.filter(ticker => ticker.type !== 'always');
   })(),

   get random() {
      return this.available[randomRange_int(0, this.length - 1)];
   },
};

export default News;