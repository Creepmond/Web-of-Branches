<script>
import StudyButtonFace from "./StudyButtonFace.vue";

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
  },
  data() { return {
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
      return `inset: ${this.Study.data.id[0] * 250}px auto auto ${this.Study.data.id[1] * 360}px`
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      return this.isBought
        ? state + 'bought'
        : this.isAvailable

        ? state + 'available'
        : state + 'unavailable';
    },
  },
  methods: {
    update() {
      this.isAvailable = player.seed.gte(this.Study.data.cost);

      this.frameId = requestAnimationFrame(this.update);
    },
    purchase() {
      if (this.isBought || !this.isAvailable) return;

      this.isBought = true;
      player.seed = player.seed.sub(this.Study.data.cost);
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <button class="o-prim-study" :class="availabilityClass" @click="purchase">
      <StudyButtonFace
        :name="Study.data.name"
        :desc="Study.data.description"
        :cost="Study.data.cost"
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