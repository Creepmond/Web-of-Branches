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
  <!--
    Seems like I'll need to artificially modify the dimensions of l-tree, StudyButtons will be
    positioned absolutely, as to modify the coordinates with more finesse.
  -->
  <div class="l-tree">
    <StudyButton :availability="'o-prim-study--unavailable'"/>
    <StudyButton
      :availability="'o-prim-study--available'"
      style="left: 0"
    />
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
  position: relative;
}

/*
.row {
  display: flex;
  flex-wrap: nowrap;
}

.offset {
  transform: translateX(160px);
}

.column {
  display: inline-block;
}*/
</style>