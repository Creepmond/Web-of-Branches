<script>
import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "HeaderResources",
  data() { return {
    seed: 0,

    frameId: null,
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
  beforeUnmount() {
    clearUpdateloop(this.frameId);
  },
};
</script>

<template>
  <div class="c-header-content--resource">
    <span class="c-header--currency-type">Seeds:</span>
    <span class="c-header--currency-value">{{ seedAmount }}</span>
  </div>
  <div class="c-header-content--resource">
    <span class="c-header--currency-type">Spectres:</span>
    <span class="c-header--currency-value">0</span>
  </div>
</template>

<style>
.c-header-content--resource {
  margin: 0 8px;

  display: flex;
  justify-content: space-between;
}

/* Moreorless a prototype for if I color-code the currencies
.c-header--currency-type {
  padding: 2px 0 0 8px;
  border-left-width: 1px;
  border-left-style: solid;
}
*/

.c-header--currency-value {
  padding: 2px 8px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
</style>