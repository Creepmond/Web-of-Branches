<script>
import StudyButton from "@/component/base/StudyButton.vue";

export default {
  name: "Tree",
  components: {
    StudyButton,
  },
  computed: {
    visibleStudies() {
      return GameData.regularStudy
    },
  },
};
</script>

<template>
  <div class="l-tree">
    <StudyButton
      v-for="study of visibleStudies"
      :id="study.id"
    />
  </div>
</template>

<style>
.l-tree {
  position: relative;
}
</style>