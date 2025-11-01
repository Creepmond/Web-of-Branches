<script>
import HeaderTabs from "./HeaderTabs.vue";

import HeaderResources   from "./HeaderResources.vue";
import HeaderOptions     from "./HeaderOptions.vue";
import HeaderSaves       from "./HeaderSaves.vue";
import HeaderInformation from "./HeaderInformation.vue";

import Notification from "@/component/article/Notification.vue";



import player from "@/core/player.js";

//// import { setUpdateloop } from "@/core/interval.js";

export default {
  name: "Header",
  components: {
    HeaderTabs,

    HeaderResources,
    HeaderOptions,
    HeaderSaves,
    HeaderInformation,

    Notification,
  },
  data() { return {
    tabList: [],
    tabbed: 'Resources',
  }},
  computed: {
    headerIndicatorPosition() {
      return this.tabList.indexOf(this.tabbed) * -200;
    },
  },
  methods: {
    switchTab(flip) {
      this.tabbed = flip;
      player.last.headerTab = flip;
    },
  },
  mounted() {
    const tabComponent = this.$options.components;

    // "key", because the components above is an Object. The actual properties for, say, something like
    // HeaderResources, is {"HeaderResources": HeaderResources}
    for (const key in tabComponent) {
      if ( !key.includes('Header') ) continue;
      const tabName = key.replace(/^Header/, '');
      if (tabName === 'Tabs') continue;
      this.tabList.push(tabName);
    };
  },
};
</script>

<template>
  <div class="o-fixed-ui o-header">
    <HeaderTabs
      v-bind:tabList
      v-bind:tabbed
      @flip="switchTab"
    />

    <div class="c-header-subject">
      
      <svg class="l-header-indicator" viewBox="-15 -22 30 30" >
        <g
          class="l-header-indicator-tabs"
          :transform="`translate(${headerIndicatorPosition}, 0)`"
        >
          <text
            v-for="(flip, index) in tabList"
            class="c-header-indicator-flip"
            :x="index * 200"
          >
            {{ flip }}
          </text>
        </g>
      </svg>
      <div
        class="l-header-content"
        :class="`l-header-content--${tabbed.toLowerCase()}`"
      >
        <component :is="'Header' + tabbed" />
      </div>

    </div>

    <Notification />
  </div>
</template>

<style>
.o-header {
  display: flex;
  flex-direction: column;
  gap: 8px;

  inset: 8px auto auto 8px;
}

.o-header > * {
  backdrop-filter: blur(2px);
}

.l-header-indicator {
  text-anchor: middle;
  font-size: 28px;
  font-weight: 300;

  padding: 0 32px;
  margin-bottom: 8px;
  border-bottom: 1px solid;

  height: 1em;
  width: 8em;

  display: inline-block;
}

.c-header-indicator-flip {
  pointer-events: auto;
}

.c-header-subject {
  width: fit-content;

  padding: 12px 16px 16px;
  border-radius: 0 8px 8px 8px;
}

.l-header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/*
.l-header-content > *:not(.l-cut) {
  margin: 0 8px;

  display: flex;
  justify-content: space-between;
}
*/
</style>