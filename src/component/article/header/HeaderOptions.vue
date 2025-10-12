<script>
//* The values shown here are not entirely accurate to their values in the player object
//  (for example, screen  here ranges 0-100, but player.option.screenSlipperiness receives this
//  value from 0 in the case of 0, or 0.901-0.999 in between)
import Slider from "@/component/default/Slider.vue";
import Toggle from "@/component/default/Toggle.vue"



import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "HeaderOptions",
  components: {
    Slider,
    Toggle,
  },
  data() { return {
    parallaxValue: 0,
    zoomValue: 0,
    tickrateValue: 0,
    globalStatBoolean: false,

    physicsBoolean: false,
    slipperinessValue: 0,

    frameId: null,
  }},
  watch: {
    parallaxValue(value) {
      player.option.parallax = value / 100;
    },
    zoomValue(value) {
      player.option.zoomLevel = value / 100;
    },
    tickrateValue(value) {
      player.option.tickrate = value;
    },
    globalStatBoolean(value) {
      player.option.showGlobalStat = value;
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
  methods: {
    update() {
      this.zoomValue = player.option.zoomLevel * 100;
      
      this.frameId = setUpdateloop(this.update);
    }
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
  beforeMount() {
    this.parallaxValue = player.option.parallax * 100;
    this.zoomValue = player.option.zoomLevel * 100;
    this.tickrateValue = player.option.tickrate;
    this.globalStatBoolean = player.option.showGlobalStat;

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
  },
};
</script>

<template>
  <div class="c-header-content-option">

    <span class="c-header-option-type">BG Parallax:</span>
    <div class="c-header-option-calculated">
      <Slider
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
      <Slider
        class="c-header-option-slider"
        id="c-header-option-zoom-value"
        :rangeProperty="[15, 300, 5]"
        :modelValue="zoomValue"
        @slide="zoomValue = $event"
      />
      <span class="c-header-option-value">{{ zoomValue.toFixed() }}%</span>
    </div>

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Tickrate:</span>
    <div class="c-header-option-calculated">
      <Slider
        class="c-header-option-slider"
        id="c-header-option-tickrate-value"
        :rangeProperty="[33, 200, 1]"
        :modelValue="tickrateValue"
        @slide="tickrateValue = $event"
      />
      <span class="c-header-option-value">{{ tickrateValue }}ms</span>
    </div>

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">
      <span class="c-header-option-type-semantic">(Metapanel)</span>
      Show Global Effects:
    </span>
    <Toggle
      class="c-header-option-toggle"
      v-model="globalStatBoolean"
    />

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
    <Toggle
      class="c-header-option-toggle"
      v-model="physicsBoolean"
      :on="'Enabled'"
      :off="'Disabled'"
    />

  </div>
  <div class="c-header-content-option">

    <span class="c-header-option-type">Slipperiness:</span>
    <div class="c-header-option-calculated">
      <Slider
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

/* Selector specificity */
span.c-header-option-type > .c-header-option-type-semantic {
  font-size: 12px;
}

.c-header-option-calculated {
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
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