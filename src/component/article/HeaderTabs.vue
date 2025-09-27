<script>
export default {
  name: "HeaderTabs",
  props: {
    tabbed: String,
  },
  emits: ['flip'],
  data() { return {
    tabList: ['Resources', 'Stats', 'Options'],
  }},
  methods: {
    tabbedState(flip) {
      if (flip === this.tabbed) return 'c-header-tab-button--flipped'
    },
  },
};
</script>

<template>
  <div class="c-header-tablist">
    <button
      v-for="flip in tabList"
      class="c-header-tab-button"
      :class="tabbedState(flip)"
      @click.exact="$emit('flip', flip)"
    >
      {{ flip }}
    </button>
  </div>
</template>

<style>
.c-header-tablist {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.c-header-tab-button {
  font-size: 16px;
  font-weight: 300;

  padding: 6px 12px;
  border-radius: 4px;
}

.c-header-tab-button--flipped {
  outline-width: 1px;
  outline-style: solid;
}
</style>