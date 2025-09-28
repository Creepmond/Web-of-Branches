<script>
import DefaultSlider from "@/component/base/DefaultSlider.vue";

import { plotScreenByCoord } from "@/core/dynamic-screen";

export default {
  name: "HeaderOptions",
  components: { DefaultSlider, },
  data() { return {
    parallaxValue: 80,
  }},
  watch: {
    parallaxValue(value) {
      player.option.parallax = value / 100;
      plotScreenByCoord();
    }
  },
};
</script>

<template>
  <div class="c-header-content-option">
    <span class="c-header-option-type">Parallax:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-parallax-value"
        :rangeProperty="[0, 200, 5]"
        :modelValue="parallaxValue"
        @slide="parallaxValue = $event"
      />
      <span class="c-header-option-value">{{ parallaxValue }}%</span>
    </div>
  </div>
</template>

<style>
.c-header-option-calculated {
  display: flex;
  align-items: center;
}

.c-header-option-slider {
  
}

.c-header-option-value {
  width: 4em;
}
</style>