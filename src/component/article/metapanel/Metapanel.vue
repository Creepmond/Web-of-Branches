<script lang="ts">
import MetapanelStudy from "./MetapanelStudy.vue";
import MetapanelNews  from "./MetapanelNews.vue";



import player from "@/core/player.js";

import EventHub, { GameEvent } from "@/core/state/eventhub.js";

export default {
  name: "Metapanel",
  components: {
    MetapanelStudy,
    MetapanelNews,
  },
  data() { return {
    // Default Metapanel state is MetapanelNews with ID as 1
    name: 'News',
    id: 1,

    isNewsEnabled: true,
  }},
  watch: {
    name(value: string) { player.last.metapanelName = value; },
    id(value: number[] | number) { player.last.metapanelId = JSON.stringify(value); },
  },
  computed: {
    stateClass() {
      return this.id ? `o-metapanel--${this.name.toLowerCase()}` : 'o-metapanel--closed';
    },
  },
  methods: {
    toggle() {
      if (this.id) {
        this.id = null;
      } else {
        this.name = 'News';
        this.id = 1 //! This isn't necessary
      };
    },
  },
  mounted() {
    EventHub.on(GameEvent.DELTA_METAPANEL, (name: string, id: number[] | number) => {
      this.name = name;
      this.id = id;
    });
  },
};
</script>

<template>
  <div
    class="o-fixed-ui o-metapanel"
    :class="stateClass"
  >
    <div class="l-metapanel-relative">
      <div class="l-metapanel-toggle">
        <button
          @click="toggle"
          class="c-metapanel-toggle"
        />
      </div>
      <template v-if="id">
        <component
          :is="'Metapanel' + name"
          :key="id"
          v-bind:id
          v-bind:isNewsEnabled
        />
      </template>
    </div>
  </div>
</template>

<style>
.o-metapanel {
  backdrop-filter: blur(2px);
  
  border-radius: 8px 0 8px 8px;

  inset: 16px 8px auto auto;
}

.l-metapanel-relative {
  max-width: 500px;

  padding: 12px 16px 20px;

  position: relative;
}

.l-metapanel-toggle {
  width: 0;
  height: 0;

  position: absolute;
  inset: auto 10px 0 auto;
}

.c-metapanel-toggle {
  pointer-events: auto;

  width: 32px;
  height: 32px;
  
  transform: translate(-50%, -50%);
  
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
}

.o-metapanel--closed {
  background-color: transparent;
}

.o-metapanel--closed .l-metapanel-toggle {
  opacity: 0.5;

  inset: 10px 10px auto auto;
}
</style>