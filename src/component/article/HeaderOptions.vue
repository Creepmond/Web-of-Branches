<script>
import DefaultSlider from "@/component/base/DefaultSlider.vue";

import { setUpdateloop } from "@/core/interval.js";
import { plotScreenByCoord, handleZoom } from "@/core/dynamic-screen.js";

export default {
  name: "HeaderOptions",
  components: { DefaultSlider, },
  data() { return {
    parallaxValue: 0,
    zoomValue: 0,
    tickrateValue: 0,

    frameId: 0,
  }},
  watch: {
    parallaxValue(value) {
      player.option.parallax = value / 100;
      plotScreenByCoord();
    },
    zoomValue() {
      handleZoom();
    },
    tickrateValue(value) {
      player.option.tickrate = value;
    },
  },
  methods: {
    update() {
      // This one is a messy... I think this is a warning I should probably make '#dynamic-content'
      // a Vue component so that I can have more free-form event-handling

      player.option.zoomLevel = this.zoomValue / 100;
      this.zoomValue = player.option.zoomLevel * 100;
      
      this.frameId = setUpdateloop(this.update);
    }
  },
  beforeMount() {
    this.parallaxValue = player.option.parallax * 100;
    this.zoomValue = player.option.zoomLevel * 100;
    this.tickrateValue = player.option.tickrate;
  },
  mounted() {
    this.update();
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
  <div class="c-header-content-option">

    <span class="c-header-option-type">Zoom:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-zoom-value"
        :rangeProperty="[20, 150, 1]"
        :modelValue="zoomValue"
        @slide="zoomValue = $event"
      />
      <span class="c-header-option-value">{{ zoomValue.toFixed() }}%</span>
    </div>

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Tickrate:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-tickrate-value"
        :rangeProperty="[33, 200, 1]"
        :modelValue="tickrateValue"
        @slide="tickrateValue = $event"
      />
      <span class="c-header-option-value">{{ tickrateValue }}ms</span>
    </div>

  </div>
</template>

<style>
.c-header-option-calculated {
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;

  display: flex;
  align-items: center;
  gap: 8px;
}

.c-header-option-slider {
  margin-left: 4px;
}

.c-header-option-value {
  display: flex;
  justify-content: start;

  width: 3.2em;
}
</style>