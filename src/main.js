import "./shim.js";

import "./utility";

import "./core/database";
import "./core";

import "./core/state";

import { createApp } from "vue";
import GameUIFixed from "./component/GameUIFixed.vue";
import GameUI from "./component/GameUI.vue";

createApp(GameUIFixed).mount('#ui-fixed')
createApp(GameUI).mount('#ui-dynamic')
