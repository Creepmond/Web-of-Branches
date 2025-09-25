<script>
export default {
  name: "StudyLink"
  // The length of a line (or rather, its endpoint coordinates x2 and y2) is determined by the
  // dimensions of that respective axis (e.g., X for Width, Y for Height) multiplied by a
  // constant of 1.25 (0.625 * 2)
}
</script>

<template>
  <svg class="l-study-link" viewBox="-100 -100 200 200">
    <line
      class="c-study-link"
      x2="450"
      y2="312.5"
    />
  </svg>
</template>

<style>
.l-study-link {
  width: 100%;
  height: 100%;

  overflow: visible;

  position: absolute;
  inset: 0;

  z-index: -2;
}

.c-study-link {
  stroke-width: 75px;
  stroke-linecap: butt;
}
</style>