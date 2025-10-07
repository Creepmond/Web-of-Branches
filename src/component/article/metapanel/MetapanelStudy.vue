<script>
import Seed from "@/core/state/seed.js";
import Study from "@/core/state/study.js";

import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "MetapanelStudy",
  data() { return {
    studyId: [],
    currentValue: '',
    globalEffect: '',

    frameId: null,
  }},
  computed: {
    Study() {
      return this.studyId.length === 0 ? undefined : Study(this.studyId);
    },
    effectIsQuantity() {
      switch (this.Study.effectInfo.type[0]) {
        case 'callback': return false;
        case 'unlock': return false;
        default: return true;
      };
    },
    
  },
  methods: {
    update() {
      this.studyId = player.last.hoveredStudy;
      this.formatValue(); // Damn it
      this.formatEffect();

      this.frameId = setUpdateloop(this.update);
    },
    formatValue() {
      const type = this.Study.effectInfo.type;

      if (type.includes('passiveRate')) {
        this.currentValue = `${formatPassRate(this.Study.effect)}`;
      } else if (type.includes('multiplier')) {
        this.currentValue = `${formatX(this.Study.effect, 2, 2)} Seed`;
      } else if (type.includes('exponent')) {
        this.currentValue = `${formatPow(this.Study.effect, 2, 2)} Seed`
      };
    },
    // Horrible. Can't even deny it now. I keep making unnecessary updates like this
    formatEffect() {
      const type = this.Study.effectInfo.type;

      if (type.includes('passiveRate')) {
        this.globalEffect = `${formatPassRate(Seed.passiveRate)}`;
      } else if (type.includes('multiplier')) {
        this.globalEffect = `${formatX(Seed.multipliers, 2, 2)} Seed`;
      } else if (type.includes('exponent')) {
        this.globalEffect = `${formatPow(Seed.exponents, 2, 2)} Seed`;
      };
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
    <div class="l-metapanel--study-info">
      <div class="l-metapanel--study_desc">
        <span class="c-metapanel--study-semantic">Description:</span>
        <span class="c-metapanel--study-value">{{ Study.description }}</span>
      </div>
      <div
        v-if="Study.specify"
        class="l-metapanel--study_spec"
      >
        <span class="c-metapanel--study-semantic">Specified:</span>
        <span class="c-metapanel--study-value" v-html="Study.specify" />
      </div>
      <div
        v-if="Study.effectInfo.type[0] !== 'callback'"
        class="l-metapanel--study_val"
      >
        <span class="c-metapanel--study-semantic">Current Value:</span>
        <span class="c-metapanel--study-value">{{ currentValue }}</span>
      </div>
      <div
        v-if="effectIsQuantity"
        class="l-metapanel--study_eff"
      >
        <span class="c-metapanel--study-semantic">Global Effect:</span>
        <span class="c-metapanel--study-value">{{ globalEffect }}</span>
      </div>
    </div>
  </template>
</template>

<style>
.l-metapanel--study_id {
  position: absolute;
  inset: 10px auto auto 0;
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

.l-metapanel--study_name {
  border-bottom-width: 1px;
  border-bottom-style: solid;

  display: flex;
  justify-content: center;
}

/* I *really* hate selector specifity */
.l-metapanel--study_name > .c-metapanel--study_name {
  font-size: 32px;
  font-weight: 300;

  padding: 0 12px 2px;
}

/* Grr */
.c-metapanel--study_name > .f-sup,
.c-metapanel--study_name > .f-sub {
  font-size: inherit;
}

.l-metapanel--study-info {
  margin-top: 4px;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.l-metapanel--study-info > * {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
}

/* Walher */
.l-metapanel--study-info > * > .c-metapanel--study-value {
  font-size: 20px;

  text-align: right;
}
</style>