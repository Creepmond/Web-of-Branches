<script>
import SideMetapanelStudy from "./SideMetapanelStudy.vue";

export default {
  name: "SideMetapanel",
  components: { SideMetapanelStudy, },
}
</script>

<template>
  <div class="o-fixed-ui o-sidebar-metapanel">
    <div class="c-metapanel-content">
      <SideMetapanelStudy />
    </div>
  </div>
</template>

<style>
.o-fixed-ui.o-sidebar-metapanel {
  padding: 0;
  border-radius: 10px 0 10px 10px;

  inset: 10px 10px auto auto;
}

.c-metapanel-content > div {
  padding: 0.5em;
  border-radius: 5px;
  margin: 10px;
}
</style>