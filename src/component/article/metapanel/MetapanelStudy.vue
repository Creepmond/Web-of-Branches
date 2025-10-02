<script>
import { setUpdateloop, clearUpdateloop } from "@/core/interval";

export default {
  name: "MetapanelStudy",
  data() { return {
    studyId: [],

    frameId: null,
  }},
  computed: {
    Study() {
      return this.studyId.length === 0 ? undefined : Study(this.studyId);
    },
    formatEffect() {
      const effectInfo = this.Study.effectInfo;

      switch (effectInfo.type) {
        case 'passiveRate': return `${formatPassRate(effectInfo.value, effectInfo.target)}`;
        case 'multiplier': return `${formatX(effectInfo.value)} ${effectInfo.target}`;
        case 'exponent': return  `${formatPow(effectInfo.value)} ${effectInfo.target}`;
        case 'unlock': return `Unlock ${effectInfo.target}`;
      }
    },
  },
  methods: {
    update() {
      this.studyId = player.last.hoveredStudy;

      this.frameId = setUpdateloop(this.update);
    },
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
  <template
    v-if=Study
  >
    <div class="l-metapanel--study_id">
      <span class="c-metapanel--study_id">
        {{ Study.id }}
      </span>
    </div>
    <div class="l-metapanel--study_name" v-if="Study">
      <span
        class="c-metapanel--study_name"
        v-html="Study.name"
      />
    </div>
  </template>
</template>

<style>
.l-metapanel--study_id {
  position: absolute;
  inset: auto auto 0 0;
}

/* I hate selector specifity */
.l-metapanel--study_id > span.c-metapanel--study_id {
  font-size: 20px;
}

.c-metapanel--study_id {
  white-space: nowrap;

  padding: 4px 8px;
  border-radius: 4px;
  outline-width: 1px;
  outline-style: solid;

  transform: translate(-50%, -50%);

  position: absolute;
  left: 0;
}

/* I *really* hate selector specifity */
.l-metapanel--study_name .c-metapanel--study_name {
  font-size: 32px;
  font-weight: 300;

  padding: 0 12px;
}
</style>