<script>
import MetapanelStudy from "./MetapanelStudy.vue";



import { setUpdateloop, clearUpdateloop } from "@/core/interval.js";

export default {
  name: "Metapanel",
  // Metapanel doesn't only appear on Study Hovers. Or at least I don't entirely plan to
  components: { MetapanelStudy, },
  data() { return {
    name: '',
    id: null,

    frameId: null,
  }},
  methods: {
    update() {
      this.name = player.last.metapanelName;
      this.id = player.last.metapanelId;

      this.frameId = setUpdateloop(this.update);
    },
    cancel() {
      // Different handler when there's more Metapanel types
      player.last.metapanelId = null
      this.id = null
    }
  },
  mounted() {
    this.update()
  },
  beforeUnmount() {
    clearUpdateloop(this.frameId);
  },
};
</script>

<template>
  <div class="o-fixed-ui o-metapanel o-metapanel--study">
    <template
      v-if="id"
    >
      <div class="c-metapanel-relative">
        <div class="l-metapanel-cancel">
          <button
            @click="cancel"
            class="c-metapanel-cancel"
          />
        </div>
        <MetapanelStudy 
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
  max-width: 50vw;

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