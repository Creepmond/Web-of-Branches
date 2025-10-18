<script>
import FunctionOrigin from "./FunctionOrigin.vue";
import FunctionRespec from "./FunctionRespec.vue";



import player from "@/core/player.js";

import EventHub, { GameEvent } from "@/core/state/eventhub.js";
import { Studies }             from "@/core/state/study.js";

export default {
  name: "Function",
  components: {
    FunctionOrigin,
    FunctionRespec,
  },
  data() { return {
    originIsVisible: false,
    respecIsVisible: false,
  }},
  mounted() {
    EventHub.on(GameEvent.AFTER_MOVE_SCREEN, (coord) => {
      this.originIsVisible = rmRef(coord) !== rmRef({ X: -140, Y: -80 })
    })

    EventHub.on(GameEvent.STUDY_PURCHASE, () => {
      this.respecIsVisible = Studies.canRespec;
    });
  }
};
</script>

<template>
  <div class="o-fixed-ui o-function">
    <div class="l-function-indicator">
      <span ckass="c-function-indicator">
        Functions
      </span>
    </div>
    <Transition name="a-function-button">
      <!-- v-show here because for the most part, it *is* in fact visible, just not displayed in some cases -->
      <FunctionOrigin v-show="originIsVisible" />
    </Transition>
    <Transition name="a-function-button">
      <FunctionRespec v-if="respecIsVisible" />
    </Transition>
  </div>
</template>

<style>
/* Selector specifity */
.o-fixed-ui.o-function {
  cursor: move;
  pointer-events: auto;
}

.o-function {
  backdrop-filter: blur(2px);

  width: fit-content;
  min-width: 36px;
  height: clamp(60px, 8vw, 96px);
  
  padding: 8px clamp(48px, 8vw, 192px) 40px;
  border-radius: 8px 8px 0 0;
  outline-width: 1px;
  outline-style: solid;

  display: flex;
  justify-content: center;
  justify-self: center;
  align-content: center;
  gap: 12px;

  bottom: 0;
}

.l-function-indicator {
  height: 28px;

  outline-width: 1px;
  outline-style: solid;

  position: absolute;
  inset: auto -4px 4px -4px;
}

.l-function-indicator:has(+ .o-function-button:hover) {
  opacity: 0.75
}

.o-function-button {
  pointer-events: auto;

  width: clamp(60px, 8vw, 96px);

  border-radius: 50%;
  outline-width: 1px;
  outline-style: solid;

  display: flex;
  justify-content: center;
  align-items: center;
}

.o-function-button--inactive {
  opacity: 0.5;
}
</style>