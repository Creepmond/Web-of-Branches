<script>
import News from "@/core/news.js";

export default {
  name: "MetapanelNews",
  props: {
    id: [Array, Number], //! This is not actually used
    isNewsEnabled: Boolean,
  },
  data() { return {
    ticker: '',
  }},
  computed: {
    scrollDuration() {

    },
  },
  methods: {
    updateTicker() {
      this.ticker = News.random();
      const tickerData = this.$refs.ticker.getBoundingClientRect();
      const tickerWidth = tickerData.width; // In pixels (px) unit
      
    },
  },
  mounted() {
    this.updateTicker();
  },
};
</script>

<template>
  <div class="l-metapanel--news">
    <span
      class="c-metapanel--news"
      ref="ticker"
      :style="`animation: scroll-x linear ${scrollDuration};`"
      :v-html="ticker"
    />
  </div>
</template>

<style>
.l-metapanel--news {
  white-space: nowrap;
  background-color: var(--hinted-color-ui);

  margin-bottom: 8px; /* Space for the toggle */
  padding: 4px 0; /* Horizontal padding isn't really needed because width is fixed and text is dynamic */
  border: 1px solid var(--color-ui-acc);
  border-radius: 4px;

  overflow: hidden;
}

/* Selector madness */
.l-metapanel--news .c-metapanel--news {
  font-size: 24px;

  width: clamp(12em, 48vw, 24em);

  display: block;

  transition: transform 0.15s linear;
}

.c-metapanel--news:hover {
  animation-play-state: paused;
}
</style>