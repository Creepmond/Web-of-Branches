<script>
import StudyButton from "@/component/base/StudyButton.vue";
import Study from "@/core/state/study";

export default {
  name: "Tree",
  components: { StudyButton, },
  data() { return {
    imperativeBoughtObject: {},
    imperativeAvailableObject: {},
  }},
  computed: {
    visibleStudies() {
      return Study.allId();
    },
  },
  methods: {
    checkStudyBoughtState(id) {
      if (id) {
        const derivative_ids = Study(id).allDerivative;

        derivative_ids.forEach(study => {
          this.imperativeBoughtObject[ rmRef(study) ] = true;
        });
      } else {
        // Should have a special handler for when Storage is implemented
        this.imperativeBoughtObject[ rmRef([0,0]) ] = true;
        this.imperativeAvailableObject[ rmRef([0,0]) ] = true;
      }
    },
    checkStudyAvailableState(id) {
      const derivative_ids = Study(id).allDerivative;

      derivative_ids.forEach(study => {
        this.imperativeAvailableObject[ rmRef(study) ] = Study(id).isAvailable;
      })
    },
    imperativeIsBought(id) {
      return this.imperativeBoughtObject[ rmRef(id) ];
    },
    imperativeIsAvailable(id) {
      return this.imperativeAvailableObject[ rmRef(id) ];
    },
  },
  beforeMount() {
    Study.allId().forEach(study => {
      this.imperativeBoughtObject[ rmRef(study) ] = false;
      this.imperativeAvailableObject[ rmRef(study) ] = false;
    });
  },
  mounted() {
    this.checkStudyBoughtState();
  },
};
</script>

<template>
  <div class="l-tree">
    <StudyButton
      v-for="study of visibleStudies"
      :id="study"
      @purchase="checkStudyBoughtState(study)"
      @available="checkStudyAvailableState(study)"
      :imperativeIsBought="imperativeIsBought(study)"
      :imperativeIsAvailable="imperativeIsAvailable(study)"
    />
  </div>
</template>

<style>
.l-tree {
  position: relative;
}
</style>