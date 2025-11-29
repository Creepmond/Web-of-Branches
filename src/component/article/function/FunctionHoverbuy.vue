<script>
import Tooltip from "@/component/default/Tooltip.vue";



import player from "@/core/player.js";

export default {
  name: "FunctionOrigin",
  components: { Tooltip, },
  data() { return {
    isToggled: false,
  }},
  watch: {
    isToggled(value) {
      player.function.hoverbuy = value;
    }
  },
  mounted() {
    this.isToggled = player.function.hoverbuy;
  },
};
</script>

<template>
  <Tooltip
    class="o-function-button"
    :class="{ 'o-function-button--toggled': isToggled }"
    @click="isToggled = !isToggled"
  >
    <span class="o-function-type__dev">
      hoverbuy
    </span>
    <template #hint>
      Toggle buying Studies on hover
    </template>
  </Tooltip>
</template>

<style>

</style>