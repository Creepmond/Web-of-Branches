<script>
export default {
  name: "GameUIFixed",
  data() { return {
    seed: 0,
    frameId: null,
  }},
  computed: {
    seedAmount() {
      return format(this.seed, 2, 2);
    },
  },
  methods: {
    update() {
      this.seed = player.seed;
      this.frameId = requestAnimationFrame(this.update);
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<template>
  <div class="c-header-currency">
    <span class="o-currency--seeds">
      Seeds: {{ seedAmount }}
    </span>
  </div>
</template>

<style>
.c-header-currency {
  padding: 1em 1.2em;

  position: fixed;
  inset: 10px auto auto 10px;

  z-index: 2;
}

.c-header-currency::after,
.c-header-currency::before {
  content: '';
  
  position: absolute;
}

.c-header-currency::after {
  inset: 0;
}
</style>