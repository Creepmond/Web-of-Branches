import rootStudy from "./root-study.js";
import news      from "./news.js";

import setupMergeGlobal from "@/utility/mapping.js"

const GameData = {
   rootStudy,
   news,
}

setupMergeGlobal(GameData, "GameData");
export default GameData;