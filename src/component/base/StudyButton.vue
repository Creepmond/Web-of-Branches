<script>
import StudyButtonFace from "./StudyButtonFace.vue";

export default {
  name: "StudyButton",
  props: {
    id: Array,
    position: String,
    imperativeIsBought: Boolean,
  },
  components: { StudyButtonFace, },
  data() { return {
    isAvailable: false,
    isBought: false,

    frameId: null,
  }},
  computed: {
    StudyInstance() {
      return Study(this.id);
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
  watch: {
    imperativeIsBought() {
      this.update();
    },
  },
  methods: {
    update() {
      if (this.isBought || !this.imperativeIsBought) return;

      console.log('hi')
      this.isAvailable = player.seed.gte(this.StudyInstance.cost);

      this.frameId = requestAnimationFrame(this.update);
    },
    purchase() {
      if (this.isBought || !this.isAvailable || !this.imperativeIsBought) return;

      this.$emit('purchase', this.id);

      player.seed = player.seed.sub(this.StudyInstance.cost);

      this.StudyInstance.purchase();
      this.isBought = true;
    },
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <div class="l-prim-study-id">
      <span class="c-prim-study-id">
        {{ StudyInstance.id }}
      </span>
    </div>
    <button
      class="o-prim-study"
      :class="availabilityClass"
      @click="purchase"
    >
      <StudyButtonFace
        :name="StudyInstance.name"
        :desc="StudyInstance.description"
        :cost="StudyInstance.cost"
      />
    </button>
  </div>
</template>

<style>
.l-prim-study__positioning {
  position: absolute;
}

.l-prim-study-id {
  position: relative;
}

.c-prim-study-id {
  font-size: 30px;
  font-weight: 300;

  position: absolute;
  inset: -40px auto auto 0;
}

.o-prim-study {
  cursor: default;

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

.o-prim-study--available {
  cursor: pointer;
}
</style>