<script>
import HeaderTabs from "./HeaderTabs.vue";
import HeaderResources from "./HeaderResources.vue";

export default {
  name: "Header",
  components: {
    HeaderTabs,
    HeaderResources,
  },
  data() { return {
    tabbed: 'Resources',
  }},
  methods: {
    switchTab(flip) {
      this.tabbed = flip;
      player.last.headerTab = flip;
    },
  },
};
</script>

<template>
  <div class="o-fixed-ui o-header">
    <HeaderTabs
      v-bind:tabbed
      @flip="switchTab"
    />

    <div class="c-header-subject">
      <component :is="'Header' + tabbed" />
    </div>
  </div>
</template>

<style>
.o-header {
  display: flex;
  flex-direction: column;
  gap: 8px;

  inset: 10px auto auto 10px;
}

.o-header > * {
  backdrop-filter: blur(2px);
}

.c-header-subject {
  width: fit-content;

  padding: 12px 16px 16px;
  border-radius: 0 8px 8px 8px;
}
</style>