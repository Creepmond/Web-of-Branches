<script>
import Tooltip from "@/component/default/Tooltip.vue";



import EventHub, { GameEvent } from "@/core/state/eventhub";
import { Studies }      from "@/core/state/study.js";

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
    respec() {
      if (!this.canRespec) return;

      Studies.respec(this.respeccedStudy);
      this.respeccedStudy = [];
    },
  },
  mounted() {
    EventHub.on(GameEvent.STUDY_RESPEC_TOGGLE, (respecced) => {
      this.respeccedStudy = respecced;
    })
  }
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