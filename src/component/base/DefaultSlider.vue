<script>
import VueSlider from "vue-3-slider-component";

export default {
  name: "DefaultSlider",
  components: { VueSlider, },
  props: { rangeProperty: Array, modelValue: Number, },
  emits: ['slide'],
  data() { return {
    forceRender: 0,
  }},
  computed: {
    sliderPosition() {
      // rangeProperty's values are: [min, max, step = 1]
      return this.modelValue / this.rangeProperty[1] * 100;
    },
  },
  methods: {
    updateModelValue(v) {
      this.$emit('slide', v)
    },
  },
};
</script>

<template>
  <vue-slider
    tooltip="none"
    :width="72"
    :min="rangeProperty[0]"
    :max="rangeProperty[1]"
    :interval="rangeProperty[2] || 1"
    v-bind:modelValue
    @change="updateModelValue"
    @dragging="updateModelValue"
  >
    <template #dot>
      <div class="vue-slider-point" />
    </template>
    <template #process>
      <div class="vue-slider-bar" :style="`width: ${sliderPosition}%;`" />
    </template>
  </vue-slider>
</template>

<style>
.vue-slider {
  pointer-events: auto;

  text-decoration-style: inline-block;
}

.vue-slider-rail {
  background-color: none;
}

.vue-slider-point {
  width: 100%;
  height: 100%;

  border-radius: 50%;
}

.vue-slider-bar {
  height: 100%;

  /* This element's height is naturally 4px. I'm not sure if there's a trick to make it based on the height */
  border-radius: 2px;

  position: absolute;
}
</style>