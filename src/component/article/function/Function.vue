<script>
import FunctionOrigin from "./FunctionOrigin.vue";
import FunctionRespec from "./FunctionRespec.vue";

import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "Function",
  components: {
    FunctionOrigin,
    FunctionRespec,
  },
  data() { return {
    isVisible: {
      origin: false,
      respec: false
    },
  }},
  methods: {
    update() {
      this.isVisible.origin = rmRef(player.last.screenCoord) !== rmRef({ X: -140, Y: -80 });
      this.isVisible.respec = player.permaStudy.respecIsUnlocked;

      setUpdateloop(this.update);
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<template>
  <div class="o-fixed-ui o-function">
    <Transition name="a-function-button">
      <!-- v-show here because for the most part, it *is* in fact visible, just not displayed in some cases -->
      <FunctionOrigin v-show="isVisible.origin" />
    </Transition>
    <Transition name="a-function-button">
      <FunctionRespec v-if="isVisible.respec" />
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
  height: clamp(72px, 8vw, 96px);
  
  padding: 8px clamp(48px, 8vw, 192px);
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

.o-function-button {
  pointer-events: auto;

  width: clamp(72px, 8vw, 96px);

  border-radius: 50%;
  outline-width: 1px;
  outline-style: solid;
}
</style>