<script>
import HeaderTabs from "./HeaderTabs.vue";
import HeaderResources from "./HeaderResources.vue";

export default {
  name: "Header",
  components: {
    HeaderTabs,
    HeaderResources,
  },
};
</script>

<template>
  <div class="o-fixed-ui o-header">
    <HeaderTabs />
    <HeaderResources />
  </div>
</template>

<style>
.o-header {
  backdrop-filter: blur(2px);

  border-radius: 0 8px 8px 8px;

  inset: 10px auto auto 10px;
}
</style>