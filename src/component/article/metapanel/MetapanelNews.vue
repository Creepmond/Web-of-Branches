<script>
import News from "@/core/news.js";

export default {
  name: "MetapanelNews",
  props: {
    id: [Array, Number], //! This is not actually used
    isNewsEnabled: Boolean,
  },
  data() { return {
    fontSize: 24, // Change .l-metapanel--news' font size if changing this
    text: '',
    widthWithFactor: 0,
    position: 0,
    seenThisSession: 0,

    frameId: null,
  }},
  watch: {
    text: {
      handler() {
        const textWidth = this.$refs.ticker.getBoundingClientRect().width;
        const textWrapperWidth = this.$refs.wrapper.getBoundingClientRect().width;
        
        this.widthWithFactor = ( textWidth + textWrapperWidth ) / this.fontSize;
      },
      flush: 'post',
    },
  },
  methods: {
    updateTicker() {
      if (this.widthWithFactor <= this.position) {
        this.text = News.random.flip;
        this.position = -this.wordsPerMinute; // Offset
        this.seenThisSession++;
      }

      this.position += this.wordsPerMinute;

      this.frameId = setTimeout(this.updateTicker, 1000);
    },
  },
  mounted() {
    const WORDS_PER_MINUTE = 60

    // Assuming each word is 4.7 letters long
    this.wordsPerMinute = ( WORDS_PER_MINUTE * 4.7 ) / 60;

    // Offset
    this.position -= this.wordsPerMinute;
    this.updateTicker();
  },
  unmounted() {
    clearTimeout(this.frameId);
    this.frameId = null;
  },
};
</script>

<template>
  <div
    class="l-metapanel--news"
    ref="wrapper"
  >
    <span
      class="c-metapanel--news"
      ref="ticker"
      :style="`transform: translateX(-${position}em);`"
      :key="seenThisSession"
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

  font-size: 24px; /* Change this.fontSize font size if changing this */

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

  transition: transform 1s linear;
}

.l-metapanel--news:hover > .c-metapanel--news {
  animation-play-state: paused;

  border-color: #000;
}
</style>