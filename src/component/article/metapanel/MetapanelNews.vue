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
      [amogus]
    </span>
  </div>
  <div class="l-metapanel--study_name">
    <span
      class="c-metapanel--study_name"
      v-html="'amogus'"
    />
  </div>
  <div class="l-metapanel--study-info">
    <div class="l-metapanel--study_desc">
      <span class="c-metapanel--study-semantic">Description:</span>
      <span class="c-metapanel--study-value">amogus</span>
    </div>
  </div>
</template>

<style>
</style>