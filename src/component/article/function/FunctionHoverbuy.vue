<script>
import { toRaw } from 'vue';



import EventHub, { GameEvent } from "@/core/state/eventhub.js";
import { Studies }      from "@/core/state/study.js";

export default {
  name: "FunctionOrigin",
  methods: {
    toggle() {
      
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
    @click="toggle"
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