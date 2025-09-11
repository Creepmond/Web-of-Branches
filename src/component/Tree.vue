<script>
import StudyButton from "@/component/base/StudyButton.vue";
import Study from "@/core/state/study";

export default {
  name: "Tree",
  components: { StudyButton, },
  data() { return {
    studyImperativeObject: {},
  }},
  computed: {
    visibleStudies() {
      return GameData.regularStudy;
    },
  },
  methods: {
    checkImperativeState(id) {
      const derivatives = Study(id).allDerivative;
      derivatives.forEach(study => {
        this.studyImperativeObject[ study.id ] = true;
      })
    },
    studyImperativeIsBought(id) {
      if (rmRef(id) !== rmRef([0,0])) {
        return this.studyImperativeObject[ rmRef(id) ]
      } else {
        return true;
      }
    },
    position(coord) {
      return `inset: ${coord[0] * 250}px auto auto ${coord[1] * 360}px`
    },
  },
  created() {
    GameData.regularStudy.forEach(study => {
      this.studyImperativeObject[ rmRef(study.id) ] = false;
    });
  },
  mounted() {
    this.checkImperativeState();
  },
};
</script>

<template>
  <div class="l-tree">
    {{ studyImperativeObject }}
    <StudyButton
      v-for="study of visibleStudies"
      :position="position(study.id)"
      :id="study.id"
      @purchase="checkImperativeState(study.id)"
      :imperative-is-bought="studyImperativeIsBought(study.id)"
    />
  </div>
</template>

<style>
.l-tree {
  position: relative;
}
</style>