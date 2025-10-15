import { createApp } from "vue";

import GameUIFixed from "@/component/GameUIFixed.vue";
import GameUIDynamic from "@/component/GameUIDynamic.vue";



//// import GameStorage from "./core/storage.js";

const FixedUI = createApp(GameUIFixed)
FixedUI.mount('#fixed-content');

const DynamicUI = createApp(GameUIDynamic)
DynamicUI.mount('#dynamic-content');

//// GameStorage.load();