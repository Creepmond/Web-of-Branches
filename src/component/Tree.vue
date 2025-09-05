<script>
import StudyButton from './StudyButton.vue';

export default {
  name: "Tree",
  components: {
    StudyButton,
  },
  data() { return {
    
  }},
  computed: {

  },
}
</script>

<template>
  <div class="l-tree">
    <div class="row">
      <StudyButton :availability="'o-prim-study--unavailable'"/>
      <StudyButton
        :availability="'o-prim-study--available'"
      />
    </div>
  </div>

  <!--
  <div
    v-for="(row, index) in 1"
    :key="row"
    class="row"
    :class="{ 'offset': index % 2 === 0 }"
  >
    <div
      v-for="column in 1"
      :key="column"
      class="column"
    >
      <GenericStudyButton />
    </div>
  </div>-->
</template>

<style>
.l-tree {
  display: relative;
}
.row {
  display: flex;
  flex-wrap: nowrap;
}

.offset {
  transform: translateX(160px);
}

.column {
  display: inline-block;
}
</style>