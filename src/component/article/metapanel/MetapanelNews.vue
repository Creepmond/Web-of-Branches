<script>
import News from "@/core/news.js";

export default {
  name: "MetapanelNews",
  props: {
    id: [Array, Number], //! This is not actually used
    isNewsEnabled: Boolean,
  },
  data() { return {
    text: '',
    width: 0,
    position: 0,
  }},
  computed: {
    scrollDuration() {
      return 4
    },
  },
  methods: {
    updateTicker() {
      console.log(this.scrollDuration)
      this.text = News.random.flip;
      this.width = this.$refs.ticker.getBoundingClientRect().width; // In pixels (px) unit

      setTimeout(this.updateTicker, this.scrollDuration * 1000 );
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
      :style="`transform: translateX(${position}em);`"
      v-html="text"
    />
  </div>
</template>

<style>
/* Selector madness */
div.l-metapanel--news {
  pointer-events: auto;

  white-space: nowrap;
  background-color: var(--hinted-color-ui);

  font-size: 24px;

  width: clamp(12em, 36vw, 48em);
  height: 1em;

  margin-bottom: 8px; /* Space for the toggle */
  padding: 4px 0; /* Horizontal padding isn't really needed because width is fixed and text is dynamic */
  border: 1px solid var(--color-ui-acc);
  border-radius: 4px;

  position: relative;

  overflow: hidden;
}

.l-metapanel--news .c-metapanel--news {
  font-size: inherit;

  width: fit-content;

  display: flex;
  align-self: center;

  position: absolute;
  inset: 0;
  left: 100%;

  transition: transform 0.15s linear;
}

.l-metapanel--news:hover > .c-metapanel--news {
  animation-play-state: paused;

  border-color: #000;
}
</style>