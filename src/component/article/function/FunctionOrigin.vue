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
.o-function-button {
  pointer-events: auto;

  backdrop-filter: blur(2px);

  width: 72px;
  height: 72px;

  border-radius: 50%;
}
</style>