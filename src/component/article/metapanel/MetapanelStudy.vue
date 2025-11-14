<script>
import EffectDisplay from "@/component/default/EffectDisplay.vue";



import player from "@/core/player.js";

import Seed  from "@/core/state/seed.js";
import Study from "@/core/state/study.js";

import DC                                 from "@/utility/constants.js";
import format                             from "@/utility/format.js";
import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "MetapanelStudy",
  props: {
    id: [Array, Number],
  },
  components: { EffectDisplay, },
  data() { return {
    /*
    showGlobal: false,

    scopedValueFormat: '',
    globalValueFormat: '',

    studyIsBought: false,
    studyScopedValue: DC.D0,

    commonFrameId: null,
    scopedEffectFrameId: null,
    globalEffectFrameId: null,
    */
  }},
  /*
  watch: {
    showGlobal: {
      handler(show) {
        show
          ? this.updateGlobalValue()
          : clearUpdateloop(this.globalEffectFrameId);
      },
      immediate: true,
    },
    studyIsBought: {
      handler(bought) {
        if (!bought) return;

        const state = this.StudyInstance.effectInfo.state;
        this.studyScopedValue = this.StudyInstance.effect;

        this.formatScoped()

        if (state === 'static') {
          this.formatScoped();
        } else
          this.updateScopedValue();
      },
      immediate: true,
    },
  },
  */
  computed: {
    StudyInstance() {
      return this.id ? Study(this.id) : null;
    },
    currentEffect() {
      return this.StudyInstance.effectValue
    }
    /*
    effectIsQuantity() {
      switch (this.StudyInstance.effectInfo.type) {
        case 'passiveRate': return true;
        case 'multiplier': return true;
        case 'exponent': return true;
        default: return false;
      };
    },
    */
  },
  methods: {
    /*
    updateCommon() {
      this.studyIsBought = this.StudyInstance.isBought;
      this.showGlobal = player.option.showGlobalStat;

      this.commonFrameId = setUpdateloop(this.updateCommon);
    },
    updateGlobalValue() {
      this.formatGlobal();

      this.globalEffectFrameId = setUpdateloop(this.updateGlobalValue);
    },
    updateScopedValue() {
      this.studyScopedValue = this.StudyInstance.effect;
      this.formatScoped();

      this.scopedEffectFrameId = setUpdateloop(this.updateScopedValue);
    },
    formatScoped() {
      const type = this.StudyInstance.effectInfo.type;

      if (type === 'passiveRate') {
        this.scopedValueFormat = `${format.passRate(this.studyScopedValue, 2, 2)}`;
      } else if (type === 'multiplier') {
        this.scopedValueFormat = `${format.mult(this.studyScopedValue, 2, 2)} Seed`;
      } else if (type === 'exponent') {
        this.scopedValueFormat = `${format.pow(this.studyScopedValue, 2, 2)} Seed`;
      } else if (type === 'unlock') {
        this.scopedValueFormat = this.isBought
          ? `Unlocked ${this.StudyInstance.effectInfo.target}`
          : `Unlock ${this.StudyInstance.effectInfo.target}`;
      };
    },
    formatGlobal() {
      const type = this.StudyInstance.effectInfo.type;

      if (type === 'passiveRate') {
        this.globalValueFormat = `${format.passRate(Seed.passiveRate)}`;
      } else if (type === 'multiplier') {
        this.globalValueFormat = `${format.mult(Seed.multipliers, 2, 2)} Seed`;
      } else if (type === 'exponent') {
        this.globalValueFormat = `${format.pow(Seed.exponents, 2, 2)} Seed`;
      };
    },
    */
  },
  mounted() {
    /*
    this.studyScopedValue = this.StudyInstance.effect;

    this.formatScoped();
    this.updateCommon();
    */
  },
  beforeUnmount() {
    /*
    clearUpdateloop(this.commonFrameId);
    clearUpdateloop(this.scopedEffectFrameId);
    clearUpdateloop(this.globalEffectFrameId);
    */
  },
}; 
</script>

<template>
  <template
    v-if=StudyInstance
  >
    <div class="l-metapanel--study_id">
      <span class="c-metapanel--study_id">
        {{ StudyInstance.id }}
      </span>
    </div>
    <div class="l-metapanel--study_name" v-if="StudyInstance">
      <span
        class="c-metapanel--study_name"
        v-html="StudyInstance.name"
      />
    </div>
    <div class="l-metapanel--study-info">
      <div class="l-metapanel--study_desc">
        <span class="c-metapanel--study-semantic">Description:</span>
        <span class="c-metapanel--study-value">{{ StudyInstance.description }}</span>
      </div>
      <div
        v-if="StudyInstance.specify"
        class="l-metapanel--study_spec"
      >
        <span class="c-metapanel--study-semantic">Specified:</span>
        <span class="c-metapanel--study-value" v-html="StudyInstance.specify" />
      </div>
      <div 
        v-if="StudyInstance.formatEffect !== null"
        class="l-metapanel--study_val"
      >
        <span class="c-metapanel--study-semantic">Current Value:</span>
        <EffectDisplay
          class="c-metapanel--study-value"
          :config="StudyInstance._config"
          :label="''"
        />
      </div>
      <!--
      <div class="l-metapanel--study_eff">
        <span class="c-metapanel--study-semantic">Global Effect:</span>
        <EffectDisplay
          class="c-metapanel--study-value"
          :config="StudyInstance"
        />
      </div>
      -->
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