import './core/dynamic-screen.js'
import './core/player.js'

import Decimal from 'break_infinity.js'
window.Decimal = Decimal;

import { createApp } from 'vue'
import GameUIFixed from './component/GameUIFixed.vue'
import GameUI from './component/GameUI.vue'

createApp(GameUIFixed).mount('#ui-fixed')
createApp(GameUI).mount('#ui-dynamic')
