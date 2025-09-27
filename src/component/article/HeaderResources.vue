<script>
import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "HeaderResources",
  data() { return {
    seed: 0,

    frameId: 0,
  }},
  computed: {
    seedAmount() {
      return format(this.seed, 2, 0);
    },
  },
  methods: {
    update() {
      this.seed = player.seed;
      this.frameId = setUpdateloop(this.update);
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<template>
  <div class="l-header-indicator">
    <span class="c-header-indicator">
      Resources
    </span>
  </div>
  <div class="l-header-content l-header-content--currency">
    <div class="c-header-content">
      <span class="c-header-currency-type">Seeds:</span>
      <span class="c-header-currency-value">{{ seedAmount }}</span>
    </div>
    <div class="c-header-content">
      <span class="c-header-currency-type">Spectres:</span>
      <span class="c-header-currency-value">0</span>
    </div>
  </div>
</template>

<style>
.l-header-indicator {
  padding: 0 32px;
  margin-bottom: 8px;
  border-bottom: 1px solid;
}

.c-header-indicator {
  font-size: 30px;
}

.l-header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.c-header-content {
  margin: 0 8px;

  display: flex;
  justify-content: space-between;
}

/* Moreorless a prototype for if I color-code the currencies
.c-header-currency-type {
  padding: 2px 0 0 8px;
  border-left-width: 1px;
  border-left-style: solid;
}
*/

.c-header-currency-value {
  padding: 2px 8px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
</style>