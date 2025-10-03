<script>
import { setUpdateloop, clearUpdateloop } from "@/core/interval";

export default {
  name: "MetapanelStudy",
  data() { return {
    studyId: [],
    studyIsBought: false,
    globalEffect: '',

    frameId: null,
  }},
  computed: {
    Study() {
      return this.studyId.length === 0 ? undefined : Study(this.studyId);
    },
    effectIsQuantity() {
      switch (this.Study.effectInfo.type) {
        case 'callback': return false;
        case 'unlock': return false;
        default: return true;
      };
    },
    formatValue() {
      const effectInfo = this.Study.effectInfo;
      const isActive = this.studyIsBought;

      switch (effectInfo.type) {
        case 'passiveRate':
          return isActive
            ? `${formatPassRate(effectInfo.value, effectInfo.target)}`
            : `${formatPassRate(0, effectInfo.target)}`;
        case 'multiplier':
          return isActive
            ? `${formatX(effectInfo.value)} ${effectInfo.target}`
            : `${formatX(1)} ${effectInfo.target}`;
        case 'exponent':
          return isActive
            ? `${formatPow(effectInfo.value)} ${effectInfo.target}`
            : `${formatPow(1)} ${effectInfo.target}`;
        case 'unlock':
          return isActive
            ? `Unlocked ${effectInfo.target}`
            : `Unlock ${effectInfo.target}`;
      };
    },
  },
  methods: {
    update() {
      this.studyId = player.last.hoveredStudy;
      this.studyIsBought = this.Study.isBought;
      this.formatEffect();

      this.frameId = setUpdateloop(this.update);
    },
    // Horrible. Can't even deny it now. I keep making unnecessary updates like this
    formatEffect() {
      switch (this.Study.effectInfo.type) {
        case 'passiveRate': this.globalEffect = `${formatPassRate(Seed.passiveRate, 'Seed')}`; break;
        case 'multiplier': this.globalEffect = `${formatX(Seed.multipliers)} Seed`; break;
        case 'exponent': this.globalEffect = `${formatPow(Seed.exponents)} Seed`; break;
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
      <div class="l-metapanel--study_val">
        <span class="c-metapanel--study-semantic">Current Value:</span>
        <span class="c-metapanel--study-value">{{ formatValue }}</span>
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
.c-metapanel--study_name > .sup,
.c-metapanel--study_name > .sub {
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