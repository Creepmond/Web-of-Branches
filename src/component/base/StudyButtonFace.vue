<script>
export default {
  name: "StudyButtonFace",
  props: {
    name: String,
    desc: String,
    cost: Decimal,
  },
  computed: {
    studyCost() {
      return format(this.cost);
    },
  },
};
</script>

<template>
  <div class="l-prim-study l-prim-study-header">
    <span class="c-prim-study-name" v-html="name" />
  </div>
  <div class="l-prim-study">
    <span class="c-prim-study-info">
      {{ desc }}
    </span>
    <span class="c-prim-study-info">
      Cost: {{ studyCost }} Seed
    </span>
  </div>
</template>

<style>
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