<script>
import StudyButton from "@/component/base/StudyButton.vue";



import EventHub, { GameEvent } from "@/core/state/eventhub.js";
import Study, { Studies }      from "@/core/state/study.js";

export default {
  name: "Tree",
  components: { StudyButton, },
  data() { return {
    studyBoughtObject: {},
    imperativeAvailableObject: {},
  }},
  computed: {
    // This is incomplete, I'm thinking of making the only studies visible are the ones per new section
    // (e.g., after Seeds, etc.)
    visibleStudies() {
      return Studies.allId;
    },
  },
  methods: {
    checkStudyState(id) {
      if (!id) {
        // Should have special handler for when Storage is implemented, I think
        Study([0,0]).derivative.forEach(child => {
          this.imperativeAvailableObject[ rmRef(child) ] = true;
        })
        return;
      }

      this.studyBoughtObject[ rmRef(id) ] = Study(id).isBought;

      const derivative_ids = Study(id).derivative;

      derivative_ids.forEach(study => {
        this.imperativeAvailableObject[ rmRef(study) ] = Study(id).isAvailable;
      });
    },
    studyIsBought(id) {
      return this.studyBoughtObject[ rmRef(id) ];
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
      this.imperativeAvailableObject[ rmRef(study) ] = false;
    });
  },
  beforeMount() {
    this.checkStudyState();
  },
  mounted() {
    EventHub.on(GameEvent.STUDY_RESPEC_COMMIT, (_, diff, init) => {
      const couplaDelta = new Set(diff).symmetricDifference(new Set(init));

      couplaDelta.forEach(delta => {
        this.studyBoughtObject[delta] = false;
      });
    });

    EventHub.on(GameEvent.AFTER_ZOOM_SCREEN, zoomLevel => {
      console.log(zoomLevel)
    });
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