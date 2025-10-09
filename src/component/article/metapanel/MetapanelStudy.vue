<script>
import Seed from "@/core/state/seed.js";
import Study from "@/core/state/study.js";

import DC from "@/utility/constants.js";
import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "MetapanelStudy",
  props: {
    id: [Array, Number],
  },
  data() { return {
    currentValueFormat: '',
    globalValueFormat: '',

    study: {
      isBought: false,

      // 'Static' Effect States (see '@/core/database/regular-study.js' at around Line 5)
      staticValue: DC.D0,
    },

    commonFrameId: null,
    globalFrameId: null,
  }},
  watch: {
    id() {
      this.study.staticValue = this.StudyInstance.effect;

      this.formatStatic();
      this.formatGlobal();

      if (this.StudyInstance.effectInfo.state !== 'static') {
        this.commonUpdate();
      } else {
        clearUpdateloop(this.commonFrameId);
      };
    },
    'study.isBought'(valueBoolean) {
      valueBoolean === true
      ? clearUpdateloop(this.commonFrameId)
      : this.commonUpdate();
      
      this.study.staticValue = this.StudyInstance.effect;
      this.formatStatic();

      console.log('ts pmo', this.study.staticValue, this.StudyInstance.effect)
    }
  },
  computed: {
    StudyInstance() {
      return this.id ? Study(this.id) : undefined;
    },
    effectIsQuantity() {
      switch (this.StudyInstance.effectInfo.type) {
        case 'passiveRate': return true;
        case 'multiplier': return true;
        case 'exponent': return true;
        default: return false;
      };
    },
  },
  methods: {
    commonUpdate() {
      console.log('ok')
      this.study.isBought = this.StudyInstance.isBought;

      this.commonFrameId = setUpdateloop(this.commonUpdate);
    },
    globalUpdate() {
      console.log('wow')
      this.formatGlobal();

      this.globalFrameId = setUpdateloop(this.globalUpdate);
    },
    formatStatic() {
      const type = this.StudyInstance.effectInfo.type;

      if (type === 'passiveRate') {
        this.currentValueFormat = `${formatPassRate(this.study.staticValue)}`;
      } else if (type === 'multiplier') {
        this.currentValueFormat = `${formatX(this.study.staticValue, 2, 2)} Seed`;
      } else if (type === 'exponent') {
        this.currentValueFormat = `${formatPow(this.study.staticValue, 2, 2)} Seed`
      };
    },
    // Horrible. Can't even deny it now. I keep making unnecessary updates like this
    formatGlobal() {
      const type = this.StudyInstance.effectInfo.type;

      if (type === 'passiveRate') {
        this.globalValueFormat = `${formatPassRate(Seed.passiveRate)}`;
      } else if (type === 'multiplier') {
        this.globalValueFormat = `${formatX(Seed.multipliers, 2, 2)} Seed`;
      } else if (type === 'exponent') {
        this.globalValueFormat = `${formatPow(Seed.exponents, 2, 2)} Seed`;
      };
    },
  },
  mounted() {
    this.study.staticValue = this.StudyInstance.effect;

    this.formatStatic();
    this.formatGlobal();
    
    this.commonUpdate();

    if (this.StudyInstance.effectInfo.state !== 'static')
      this.globalUpdate();
  },
  beforeUnmount() {
    clearUpdateloop(this.commonFrameId);
    clearUpdateloop(this.globalFrameId);
  }
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
        v-if="StudyInstance.effectInfo.state !== 'callback'"
        class="l-metapanel--study_val"
      >
        <span class="c-metapanel--study-semantic">Current Value:</span>
        <span class="c-metapanel--study-value">{{ currentValueFormat }}</span>
      </div>
      <div
        v-if="effectIsQuantity"
        class="l-metapanel--study_eff"
      >
        <span class="c-metapanel--study-semantic">Global Effect:</span>
        <span class="c-metapanel--study-value">{{ globalValueFormat }}</span>
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