<script>
import StudyButton from "@/component/base/StudyButton.vue";

import { originStudy } from "@/utility/constants.js";

export default {
  name: "Tree",
  components: { StudyButton, },
  data() { return {
    imperativeBoughtObject: {},
    imperativeAvailableObject: {},
  }},
  computed: {
    visibleStudies() {
      return Studies.allId;
    },
  },
  methods: {
    checkStudyState(id) {
      if (id) {
        const derivative_ids = Study(id).derivative;

        derivative_ids.forEach(study => {
          this.imperativeAvailableObject[ rmRef(study) ] = Study(id).isAvailable;
          this.imperativeBoughtObject[ rmRef(study) ] = Study(id).isBought;
        });
      } else {
        // Should have a special handler for when Storage is implemented
        this.imperativeBoughtObject[originStudy] = true;
        this.imperativeAvailableObject[originStudy] = true;
        
        // This is terrible, what else is new
        const originDerivative_ids = Study([0,0]).derivative;

        originDerivative_ids.forEach(study => {
          this.imperativeAvailableObject[ rmRef(study) ] = true;
        });
      }
    },
    imperativeIsBought(id) {
      return this.imperativeBoughtObject[ rmRef(id) ];
    },
    imperativeIsAvailable(id) {
      return this.imperativeAvailableObject[ rmRef(id) ];
    },
  },
  created() {
    Studies.allId.forEach(study => {
      this.imperativeBoughtObject[ rmRef(study) ] = false;
      this.imperativeAvailableObject[ rmRef(study) ] = false;
    });
  },
  beforeMount() {
    this.checkStudyState();
  },
};
</script>

<template>
  <div class="l-tree">
    <StudyButton
      v-for="study of visibleStudies"
      :id="study"
      @purchase="checkStudyState(study)"
      @available="checkStudyState(study)"
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