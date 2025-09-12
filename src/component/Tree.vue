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
      return Study.allId();
    },
  },
  methods: {
    checkImperativeState(id) {
      if (id) {
        const derivative_ids = Study(id).allDerivative;
        derivative_ids.forEach(study => {
          this.studyImperativeObject[ rmRef(study) ] = true;
        });
      } else {
        this.studyImperativeObject[ rmRef([0,0]) ] = true;
      }
    },
    studyImperativeIsBought(id) {
      return this.studyImperativeObject[ rmRef(id) ];
    },
    visibleStudiesAAAAAAAAAAAAAAAA() {

    },
  },
  created() {
    Study.allId().forEach(study => {
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
    <StudyButton
      v-for="study of visibleStudies"
      :id="study"
      @purchase="checkImperativeState(study)"
      :imperative-is-bought="studyImperativeIsBought(study)"
    />
  </div>
</template>

<style>
.l-tree {
  position: relative;
}
</style>