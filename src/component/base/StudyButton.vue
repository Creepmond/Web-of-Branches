<script>
import StudyButtonFace from "./StudyButtonFace.vue";
import StudyTooltip from "./StudyTooltip.vue";

export default {
  name: "StudyButton",
  props: {
    id: {
      type: Array,
      required: true,
    },
  },
  components: {
    StudyButtonFace,
    StudyTooltip,
  },
  data() { return {
    imperativeIsBought: false,
    isAvailable: false,
    isBought: false,

    frameId: null,
  }},
  watch: {
    isBought() {
      player.studyBoughtBits.addArray(this.id);
    }
  },
  computed: {
    Study() { return Study(this.id); },
    position() {
      return `inset: ${this.Study.id[0] * 250}px auto auto ${this.Study.id[1] * 360}px`
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      if (this.isBought) {
        return state + 'bought';
      } else if (this.imperativeIsBought && this.isAvailable) {
        return state + 'available';
      } else {
        return state + 'unavailable';
      }
    },
  },
  methods: {
    update() {
      if (this.isBought) return;

      rmRef(this.id) === rmRef([0,0])
      ? this.imperativeIsBought = true
      : this.imperativeIsBought = player.studyBoughtBits.hasArray(this.Study.imperative);

      this.isAvailable = player.seed.gte(this.Study.cost);

      this.frameId = requestAnimationFrame(this.update);
    },
    purchase() {
      if (this.isBought || !this.isAvailable || !this.imperativeIsBought) return;

      this.isBought = true;
      player.seed = player.seed.sub(this.Study.cost);
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <button
      class="o-prim-study"
      :class="availabilityClass"
      @click="purchase"
    >
      <StudyButtonFace
        :name="Study.name"
        :desc="Study.description"
        :spec="Study.specify"
        :cost="Study.cost"
      />
    </button>
  </div>
</template>

<style>
.l-prim-study__positioning {
  position: absolute;
}

.o-prim-study {
  height: 160px;
  width: 280px;

  border-radius: 2px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: relative;
}

.o-prim-study::before {
  content: '';

  border-radius: 2px;

  position: absolute;

  z-index: -1;
}

.o-prim-study--unavailable {
  cursor: default;
}
</style>