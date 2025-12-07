import GameData from "@/database/index.js";

import setupMergeGlobal    from "@/utility/mapping.js";
import { randomRange_int } from "@/utility/math.js";

const News = {
	available: (function() {
		return GameData.news.filter(ticker => ticker.type === 'always');
	})(),

   get random() {
		const index = randomRange_int(0, this.available.length - 1)
		return this.available[index];
	},
};

setupMergeGlobal(News, 'News');
export default News;