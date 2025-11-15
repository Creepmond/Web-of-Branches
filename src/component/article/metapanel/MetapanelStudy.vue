<script>
import EffectDisplay from "@/component/default/EffectDisplay.vue";


import Study from "@/core/state/study.js";

export default {
  name: "MetapanelStudy",
  props: {
    id: [Array, Number],
    // This value is never used, but I need it to avoid Vue warns about being passed an uncalled prop
    isNewsEnabled: Boolean,
  },
  components: { EffectDisplay, },
  computed: {
    StudyInstance() {
      return this.id ? Study(this.id) : null;
    },
    currentEffect() {
      return this.StudyInstance.effectValue
    }
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