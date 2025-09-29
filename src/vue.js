import { createApp } from "vue";
import GameUIFixed from "./component/GameUIFixed.vue";
import GameUIDynamic from "./component/GameUIDynamic.vue";

const FixedUI = createApp(GameUIFixed)
FixedUI.mount('#fixed-content');

const DynamicUI = createApp(GameUIDynamic)
DynamicUI.mount('#dynamic-content');