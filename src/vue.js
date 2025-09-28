import { createApp } from "vue";
import GameUIFixed from "./component/GameUIFixed.vue";
import GameUI from "./component/Tree.vue";

const FixedUI = createApp(GameUIFixed)
FixedUI.mount('#fixed-content');

const UI = createApp(GameUI).mount('#user-interface');