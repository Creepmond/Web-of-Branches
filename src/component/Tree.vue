<script>
import StudyButton from "@/component/base/StudyButton.vue";

import { setUpdateloop } from "@/core/interval";

export default {
  name: "Tree",
  components: { StudyButton, },
  data() { return {
    // This one is for handling when respec happens... I might be able to improve it later, but for now
    // as long as it works, it's fine
    studyBoughtBits: [],

    studyBoughtObject: {},
    studyExposedObject: {}, // I don't think I need this necessarily. But... ah, let's leave that a problem
    // for later as well. Why not
    imperativeAvailableObject: {},
  }},
  computed: {
    // This is incomplete, I'm thinking of making the only studies visible are the ones per new section
    // (e.g., after Seeds, etc.)
    visibleStudies() {
      return Studies.allId;
    },
  },
  watch: {
    studyBoughtBits(diff, init) {
      const couplaDelta = new Set(diff).symmetricDifference(new Set(init));

      couplaDelta.forEach(delta => {
        this.studyBoughtObject[delta] = Study( addRef(delta) ).isBought;
      });
    },
  },
  methods: {
    update() {
      this.studyBoughtBits = player.studyBoughtBits;

      setUpdateloop(this.update);
    },
    checkStudyState(id) {
      if (!id) {
        // Should have special handler for when Storage is implemented, I think
        Study([0,0]).derivative.forEach(child => {
          this.imperativeAvailableObject[ rmRef(child) ] = true;
        })
        return;
      }

      this.studyBoughtObject[ rmRef(id) ] = Study(id).isBought;
      this.studyExposedObject[ rmRef(id) ] = true;

      const derivative_ids = Study(id).derivative;

      derivative_ids.forEach(study => {
        this.imperativeAvailableObject[ rmRef(study) ] = Study(id).isAvailable;
      });
    },
    studyIsBought(id) {
      return this.studyBoughtObject[ rmRef(id) ];
    },
    studyIsExposed(id) {
      return this.studyExposedObject[ rmRef(id) ];
    },
    imperativeIsBought(id) {
      const thisImperative = Study(id).imperative;
      return this.studyBoughtObject[ rmRef(thisImperative) ];
    },
    imperativeIsAvailable(id) {
      return this.imperativeAvailableObject[ rmRef(id) ];
    },
  },
  created() {
    Studies.allId.forEach(study => {
      this.studyBoughtObject[ rmRef(study) ] = false;
      this.studyExposedObject[ rmRef(study) ] = false;
      this.imperativeAvailableObject[ rmRef(study) ] = false;
    });
  },
  beforeMount() {
    this.checkStudyState();
  },
  mounted() {
    this.update();
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
      :isBought="studyIsBought(study)"
      :isExposed="studyIsExposed(study)"
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