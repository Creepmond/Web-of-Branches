<script>
import Tooltip from "@/component/default/Tooltip.vue";

export default {
  name: "FunctionOrigin",
  components: { Tooltip, },
  methods: {
    teleportToOrigin() {
      player.last.screenCoord = { X: -140, Y: -80 };
      player.option.zoomLevel = 1;
    },
  },
};
</script>

<template>
  <Tooltip
    class="o-function-button"
    @click="teleportToOrigin"
  >
    <span class="o-function-type__dev">
      origin
    </span>
    <template #hint>
      Teleport the screen to Study: [0, 0]
    </template>
  </Tooltip>
</template>

<style>
.o-function-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>