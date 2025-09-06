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
    position() {
      return `inset: ${this.id[0] * 250}px auto auto ${this.id[1] * 360}px`
    },
    cost() {
      return Study(this.id).data.cost;
    },
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <div class="o-prim-study">
      <div class="l-prim-study l-prim-study-header">
        <span class="c-prim-study-name">
          The Root
        </span>
      </div>
      <div class="l-prim-study">
        <span class="c-prim-study-info c-prim-study-info--desc">
          Unlock the first Branch
        </span>
        <button class="c-prim-study-info c-prim-study-info--buy">
          Cost: {{ cost }} Seed
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.l-prim-study__positioning {
  position: absolute;
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
  width: 50%;
  margin: 0 auto;
}
</style>