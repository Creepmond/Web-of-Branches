<script>
import MetapanelStudy from "./MetapanelStudy.vue";



import EventHub, { GameEvent } from "@/core/state/eventhub.js";

export default {
  name: "Metapanel",
  // Metapanel doesn't only appear on Study Hovers. Or at least I don't entirely plan to
  components: { MetapanelStudy, },
  data() { return {
    name: '',
    id: null,
  }},
  methods: {
    cancel() {
      this.id = null;
    },
  },
  mounted() {
    EventHub.on(GameEvent.DELTA_METAPANEL, (name, id) => {
      this.name = name;
      this.id = id;
    });
  },
};
</script>

<template>
  <div class="o-fixed-ui o-metapanel o-metapanel--study">
    <template v-if="id">
      <div class="c-metapanel-relative">
        <div class="l-metapanel-cancel">
          <button
            @click="cancel"
            class="c-metapanel-cancel"
          />
        </div>
        <MetapanelStudy 
          :key="id"
          v-bind:id
        />
      </div>
    </template>
  </div>
</template>

<style>
.o-metapanel {
  backdrop-filter: blur(2px);
  
  border-radius: 8px 0 8px 8px;

  inset: 16px 8px auto auto;
}

.c-metapanel-relative {
  max-width: 500px;

  padding: 12px 16px 20px;

  position: relative;
}

.l-metapanel-cancel {
  width: 0;
  height: 0;

  position: absolute;
  inset: auto 10px 0 auto;
}

.c-metapanel-cancel {
  pointer-events: auto;

  width: 32px;
  height: 32px;
  
  transform: translate(-50%, -50%);
  
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
}
</style>