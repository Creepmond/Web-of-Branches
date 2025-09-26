<script>
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
      if (player.last.hoveredStudy.length === 2)
        this.Study = Study(player.last.hoveredStudy);

      requestAnimationFrame(this.update)
    },
  },
  mounted() {
    this.update()
  },
};
</script>

<template>
  <div v-if="Study">
    <div class="l-metapanel-study-header">
      <span class="c-study-header">
        <span class="c-study-name" v-html="Study.name" />
        <span class="c-study-id">{{ Study.id }}</span>
      </span>
    </div>
    <div class="l-metapanel-study-data">
      <span class="c-study-data">
        <span class="c-study-data-semantic">Description:</span>
        {{ Study.description }}
      </span>
      <span class="c-study-data" v-if="Study.specify">
        <span class="c-study-data-semantic">Specified:</span>
        <span class="c-study-data-value" v-html="Study.specify"/>
      </span>
      <span class="c-study-data" v-if="Study.effectInfo">
        <span class="c-study-data-semantic">Effect:</span>
        {{ formatEffect }}
      </span>
      <span class="c-study-data" v-if="1 + 1 === 3"> <!-- Apologies for this absurd method, but
      Compoundeds are a headache for later -->
        <span class="c-study-data-semantic">Compound:</span>
        +152/s Seeds
      </span>
    </div>
  </div>
</template>

<style>
.l-metapanel-study-header {
  font-size: 1.4em;
}

.c-study-id {
  font-size: 0.7em;

  vertical-align: super;
}

.l-metapanel-study-data > * {
  text-align: start;

  display: block;
}

.c-study-data-semantic {
  font-size: 0.6em;
}
</style>