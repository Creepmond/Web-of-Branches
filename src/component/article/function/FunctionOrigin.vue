<script>
export default {
  name: "FunctionOrigin",
  methods: {
    teleportToOrigin() {
      player.last.screenCoord = { X: -140, Y: -80 };
    }
  },
};
</script>

<template>
  <button
    @click="teleportToOrigin"
    class="o-function-button"
  >
    <span>origin</span>
  </button>
</template>

<style>

</style>