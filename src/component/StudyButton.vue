<script>
export default {
  name: "StudyButton",
  props: {
    id: {
      type: Array,
      required: true,
    },
  },
  data() { return {
    isAvailable: false,
    isBought: false,
  }},
  watch: {
    isBought() {
      player.studyBoughtBits.addArray(this.id);
    }
  },
  computed: {
    study() {
      return Study(this.id);
    },
    position() {
      return `inset: ${this.study.data.id[0] * 250}px auto auto ${this.study.data.id[1] * 360}px`
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      return this.isBought
        ? state + 'bought'
        : state + 'available';
    },

    studyCost() { return format(this.study.data.cost); }
  },
  methods: {
    purchase() {
      this.isBought = true;
    },
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <button class="o-prim-study" :class="availabilityClass" @click="purchase">
      <div class="l-prim-study l-prim-study-header">
        <span class="c-prim-study-name">
          {{ study.data.name }}
        </span>
      </div>
      <div class="l-prim-study">
        <span class="c-prim-study-info">
          {{ study.data.description }}
        </span>
        <span class="c-prim-study-info">
          Cost: {{ studyCost }} Seed
        </span>
      </div>
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

.l-prim-study {
  width: fit-content;
  margin: 0 auto;
}

.c-prim-study-name {
  font-size: 30px;
}

.c-prim-study-info {
  display: block;
}
</style>