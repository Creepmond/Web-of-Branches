<script>
export default {
  name: "Tooltip",
  data() { return {
    hintIsShown: false,
  }},
};
</script>

<template>
  <div
    class="o-interesting-item"
    @pointerenter="hintIsShown = true"
    @pointerleave="hintIsShown = false"
  >
    <slot />
    <Transition name="a-tooltip">
      <div
        v-show="hintIsShown"
        class="o-tooltip"
      >
        <span class="c-tooltip">
          <slot name="hint">Tooltip here!</slot>
        </span>
      </div>
    </Transition>
  </div>
</template>

<style>
.o-interesting-item {
  position: relative;
}

.o-tooltip {
  pointer-events: none;
  white-space: nowrap;

  height: 1.5em;

  padding: 4px 12px;
  border-radius: 8px;
  outline-width: 1px;
  outline-style: solid;

  /* Not 'transform:' cause of animation */
  translate: 50% 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  inset: -60px 50% auto auto;
}

.o-tooltip::before {
  content: '';

  width: 0;
  height: 0;

  transform: translateX(-50%);

  /* Unfortunate there isn't any shorthand property to this like "border-color: auto transparent auto;" */
  border-left-color: transparent;
  border-right-color: transparent;
  border-width: 8px 8px 0;
  border-style: solid;

  position: absolute;
  inset: auto 50% -8px;
}

/* Selector specifity */
div.o-tooltip > span {
  pointer-events: none;

  font-size: 16px;
}
</style>