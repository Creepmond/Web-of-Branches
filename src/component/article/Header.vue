<script>
export default {
  name: "Header",
  data() { return {
    seed: 0,
    frameId: null,
  }},
  computed: {
    seedAmount() {
      return format(this.seed, 2, 0);
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
  <div class="o-fixed-ui o-header">
    <span class="o-header-currency_seeds">
      Seeds: {{ seedAmount }}
    </span>
  </div>
</template>

<style>
.o-header {
  inset: 10px auto auto 10px;
}
</style>