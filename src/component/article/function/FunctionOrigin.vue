<script>
import Tooltip from "@/component/default/Tooltip.vue";



import player from "@/core/player.js";

import EventHub, { GameEvent } from "@/core/state/eventhub.js";

export default {
  name: "FunctionOrigin",
  components: { Tooltip, },
  methods: {
    teleportToOrigin() {
      const origin = { X: -140, Y: -80 };

      player.last.screenCoord = origin;
      EventHub.dispatch(GameEvent.AFTER_MOVE_SCREEN, origin);
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

</style>