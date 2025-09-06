<script>
export default {
  name: "StudyButton",
  props: {
    id: {
      type: Array,
      required: true,
    },
  },
  computed: {
    study() {
      return Study(this.id);
    },
    position() {
      return `inset: ${this.study.data.id[0] * 250}px auto auto ${this.study.data.id[1] * 360}px`
    },
    availabilityStatus() {
      const isBought = player.studyBoughtBits.has(JSON.stringify(this.id));
      return isBought ? 'bought' : 'available';
    },
    availabilityClass() {
      return `o-prim-study--${this.availabilityStatus}`;
    },
  },
  methods: {
    purchase() {
      player.studyBoughtBits.add(JSON.stringify(this.id));
    }
  }
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
          Cost: {{ study.data.cost }} Seed
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
.o-prim-study span {
  transition: color 0.15s;
}

.o-prim-study::before {
  content: '';

  border-radius: 2px;

  position: absolute;
  inset: -4px;

  z-index: -1;
  transition: all 0.15s;
}

.o-prim-study--available {
  transition: all 0.15s;
}
.o-prim-study--available span {
  transition: all 0.15s;
}

.o-prim-study--available::before {
  content: none;
}

.l-prim-study {
  width: 100%;
  margin: 0 auto;
}

.c-prim-study-name {
  
}

.c-prim-study-info {
  display: block;
}
</style>