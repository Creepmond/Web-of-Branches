import news from "@/database/news.js";

import { randomRange_int } from "@/utility/math.js";

const News = {
	available: (function() {
		return news.filter(ticker => ticker.type === 'always');
	})(),

   get random() {
		const index = randomRange_int(0, this.available.length - 1)
		return this.available[index];
	},
};

export default News;