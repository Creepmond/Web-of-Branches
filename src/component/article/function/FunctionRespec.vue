<script>
import Tooltip from "@/component/default/Tooltip.vue";



import player from "@/core/player.js";

import Study from "@/core/state/study.js";

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

      const diffBoughtBits = new Set();
      //// const branches = new Set();

      // This is intenetionally inside an Array, similar to how Study().derivatives are formatted (e.g.,
      // [ [3, -0.5], [3, 0.5] ]; or [ [4, 1] ]; or simply just [  ]; if it doesn't have any derivatives
      let targetId = [ Object.values(this.respeccedStudy) ];

      do {
        // yeah nah mate too lazy
        if (targetId.length > 1) throw "dude make a special handling for this"
        if (!Study(targetId[0]).isBought) break;

        diffBoughtBits.addArray(targetId[0]);

      } while ((targetId = Study(targetId[0]).derivative) && targetId[0]);

      const newBoughtBits = new Set(player.studyBoughtBits).difference(diffBoughtBits);
      player.studyBoughtBits = [...newBoughtBits];

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