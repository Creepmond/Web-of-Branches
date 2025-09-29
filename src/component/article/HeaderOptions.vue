<script>
import DefaultSlider from "@/component/base/DefaultSlider.vue";
import DefaultToggle from "@/component/base/DefaultToggle.vue"

import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";
import { plotScreenByCoord, handleZoom } from "@/core/dynamic-screen.js";

export default {
  name: "HeaderOptions",
  components: {
    DefaultSlider,
    DefaultToggle,
  },
  data() { return {
    parallaxValue: 0,
    zoomValue: 0,
    tickrateValue: 0,

    physicsBoolean: false,
    slipperinessValue: 0,

    frameId: null,
  }},
  watch: {
    parallaxValue(value) {
      player.option.parallax = value / 100;
      plotScreenByCoord();
    },
    zoomValue() {
      player.option.zoomLevel = this.zoomValue / 100;
      handleZoom();
    },
    tickrateValue(value) {
      player.option.tickrate = value;
    },
    physicsBoolean(value) {
      player.physics.isEnabled = value;
    },
    slipperinessValue(value) {
      if (value === 0) return player.physics.screenSlipperiness = 0;

      let appliedSlip = value;
      if (value === 100) appliedSlip = 99;
      
      appliedSlip = appliedSlip * 0.1 + 90

      player.physics.screenSlipperiness = appliedSlip / 100;
    },
  },
  computed: {
    parallaxFormat() {
      if (this.parallaxValue === 0) return 'FIXED';
      if (this.parallaxValue === 100) return 'OFF';
        
      return `${this.parallaxValue}%`;
    },
    slipperinessFormat() {
      if (this.slipperinessValue === 0 || this.physicsBoolean === false) return 'OFF';
      if (this.slipperinessValue === 100) return '99%';
        
      return `${this.slipperinessValue}%`;
    },
  },
  methods: {
    update() {
      // I'm well aware this causes problems and that this one is in particular is a little messy... I
      // think this is a warning I should probably make '#dynamic-content' a Vue component so that I can
      // have more free-form event-handling. Welp, problem for future-me am I right or am I right lads

      player.option.zoomLevel = this.zoomValue / 100;
      
      this.frameId = setUpdateloop(this.update);
    }
  },
  beforeMount() {
    this.parallaxValue = player.option.parallax * 100;
    this.zoomValue = player.option.zoomLevel * 100;
    this.tickrateValue = player.option.tickrate;

    this.physicsBoolean = player.physics.isEnabled;
    player.physics.screenSlipperiness === 0
    ? this.slipperinessValue = 0
    : this.slipperinessValue = Math.floor((player.physics.screenSlipperiness * 100 - 90) * 10);
  },
  mounted() {
    this.update();
  },
  beforeUnmount() {
    clearUpdateloop(this.frameId);
    this.frameId = null;
  },
};
</script>

<template>
  <div class="c-header-content-option">

    <span class="c-header-option-type">BG Parallax:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-parallax-value"
        :rangeProperty="[0, 200, 5]"
        :modelValue="parallaxValue"
        @slide="parallaxValue = $event"
      />
      <span class="c-header-option-value">{{ parallaxFormat }}</span>
    </div>

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Zoom Level:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-zoom-value"
        :rangeProperty="[20, 200, 5]"
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
  <div class="l-cut l-header-content-option-cut">
    <span
      class="c-header-physics-indicator"
      id="c-header-physics-indicator"
    >
      Physics
    </span>
  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Is Enabled:</span>
    <DefaultToggle
      class="c-header-option-toggle"
      v-model="physicsBoolean"
      :on="'Enabled'"
      :off="'Disabled'"
    />

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Slipperiness:</span>
    <div class="c-header-option-calculated">
      <DefaultSlider
        class="c-header-option-slider"
        id="c-header-option-slipperiness-value"
        :rangeProperty="[0, 100, 5]"
        :modelValue="slipperinessValue"
        @slide="slipperinessValue = $event"
        :disabled="!physicsBoolean"
      />
      <span class="c-header-option-value">{{ slipperinessFormat }}</span>
    </div>

  </div>
</template>

<style>
.c-header-option-calculated,
.c-header-option-toggle {
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;

  display: flex;
  align-items: center;
}

.c-header-option-calculated {
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  gap: 8px;
}

.c-header-option-toggle {
  
}

.c-header-option-slider {
  margin-left: 4px;
}

.c-header-option-value {
  display: flex;
  justify-content: start;

  width: 3.2em;
}

.l-header-content-option-cut {
  margin-bottom: 8px;

  position: relative;
}

#c-header-physics-indicator {
  font-size: 20px;

  padding: 0 8px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

#c-header-physics-indicator::before {
  content: '';

  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-radius: 50%;

  position: absolute;
  inset: 0 0 50%;
}
</style>