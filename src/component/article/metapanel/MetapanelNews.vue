<script>
export default {
  name: "MetapanelNews",
  props: {
    id: [Array, Number],
    isNewsEnabled: Boolean,
  },
}; 
</script>

<template>
  <div class="l-metapanel--news">
    <span
      class="c-metapanel--news"
      v-html="'amogus'"
    />
  </div>
</template>

<style>
.l-metapanel--news {
  background-color: var(--hinted-color-ui);

  margin-bottom: 8px; /* Space for the toggle */
  padding: 4px 0; /* Horizontal padding isn't really needed because width is fixed and text is dynamic */
  border: 1px solid var(--color-ui-acc);
  border-radius: 4px;
}

/* Selector madness */
.l-metapanel--news .c-metapanel--news {
  font-size: 24px;

  width: clamp(12em, 48vw, 24em);

  display: block;
}
</style>