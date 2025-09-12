import { createApp } from "vue";
import GameUIFixed from "./component/GameUIFixed.vue";
import GameUI from "./component/Tree.vue";

createApp(GameUIFixed).mount('#ui-fixed');
createApp(GameUI).mount('#ui-dynamic');