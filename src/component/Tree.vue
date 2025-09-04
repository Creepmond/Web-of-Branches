<script>
import GenericStudyButton from './GenericStudyButton.vue';

export default {
  name: "Tree",
  components: {
    GenericStudyButton,
  },
}
</script>

<template>
  <div class="row">
    <GenericStudyButton :availability="'o-prim-study--unavailable'"/>
    <GenericStudyButton :availability="'o-prim-study--available'" />
    <GenericStudyButton />
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