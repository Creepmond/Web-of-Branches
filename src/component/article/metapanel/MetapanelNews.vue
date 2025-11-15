<script>
export default {
  name: "MetapanelNews",
  props: {
    id: [Array, Number],
    isNewsEnabled: Boolean,
  },
}; 
</script>

<template>
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
  </div>
</template>

<style>
</style>