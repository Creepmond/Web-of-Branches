<script>
import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "SideMetapanelStudy",
  data() { return {
    Study: undefined,

    frameId: 0,
  }},
  computed: {
    formatEffect() {
      const effectInfo = this.Study.effectInfo;

      switch (effectInfo.type) {
        case 'passiveRate': return `${formatPassRate(effectInfo.value, effectInfo.target)}`;
        case 'multiplier': return `${formatX(effectInfo.value)} ${effectInfo.target}`;
        case 'exponent': return  `${formatPow(effectInfo.value)} ${effectInfo.target}`;
        case 'unlock': return `Unlock ${effectInfo.target}`;
      }
    }
  },
  methods: {
    update() {
      console.log('tried to update for no reason smh')
    }
  },
  mounted() {
    this.update()
  },
};
</script>

<template>
  
</template>

<style>

</style>