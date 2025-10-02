<script>
import MetapanelStudy from "./MetapanelStudy.vue";

import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "Metapanel",
  // Metapanel doesn't only appear on Study Hovers. Or at least I don't entirely plan to
  components: { MetapanelStudy, },
  data() { return {
    metapanelIsShown: false,
  }},
  methods: {
    update() {
      this.metapanelIsShown = player.last.hoveredStudy.length === 0 ? false : true;

      setUpdateloop(this.update);
    },
  },
  mounted() {
    this.update()
  },
};
</script>

<template>
  <div class="o-fixed-ui o-metapanel o-metapanel--study">
    <template
      v-if="metapanelIsShown"
    >
      <div class="l-metapanel-relative">
        <MetapanelStudy />
      </div>
    </template>
  </div>
</template>

<style>
.o-metapanel {
  backdrop-filter: blur(2px);
  
  border-radius: 8px 0 8px 8px;

  inset: 10px 10px auto auto;
}

.l-metapanel-relative {
  padding: 12px 16px 20px;

  position: relative;
}
</style>