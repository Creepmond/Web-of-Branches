<script>
import SideInfographicStudy from "./SideInfographicStudy.vue";

export default {
  name: "SideInfographic",
  components: { SideInfographicStudy, },
}
</script>

<template>
  <div class="o-fixed-ui o-sidebar-infographic">
    <div class="c-infographic-content">
      <SideInfographicStudy />
    </div>
  </div>
</template>

<style>
.o-fixed-ui.o-sidebar-infographic {
  padding: 0;
  border-radius: 10px 0 10px 10px;

  inset: 10px 10px auto auto;
}

.c-infographic-content > div {
  padding: 0.5em;
  border-radius: 5px;
  margin: 10px;
}
</style>