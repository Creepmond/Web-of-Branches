<script>
import Tooltip from "@/component/default/Tooltip.vue";

import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "FunctionOrigin",
  components: { Tooltip, },
  data() { return {
    respeccedStudy: [],
  }},
  computed: {
    canRespec() {
      return this.respeccedStudy.length > 0;
    },
    respecClass() {
      const state = 'o-function-button--';

      return this.canRespec
        ? state + 'available'
        : state + 'inactive';
    },
  },
  methods: {
    update() {
      this.respeccedStudy = player.last.respeccedStudy;

      setUpdateloop(this.update);
    },
    respec() {
      if (!this.canRespec) return;

      const studyIndex = player.studyBoughtBits.indexOf(this.respeccedStudy);
      player.studyBoughtBits = player.studyBoughtBits.slice(0, studyIndex);

      player.last.respeccedStudy = [];
    },
  },
  mounted() {
    //! Needs handler for (or rather, if) when this is stop being called
    this.update();
  },
};
</script>

<template>
  <Tooltip
    class="o-function-button"
    :class="respecClass"
    @click="respec"
  >
    <span class="o-function-type__dev">
      respec
    </span>
    <template #hint>
      <template
        v-if="canRespec"
      >
        Respec to Study: {{ respeccedStudy }}
      </template>
      <template
        v-else
      >
        You have not toggled a respec yet
      </template>
    </template>
  </Tooltip>
</template>

<style>

</style>