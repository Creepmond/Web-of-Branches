<script>
export default {
  name: "StudyLink",
  props: {
    id: Array,
    derivative: Array,
    isObfuscated: Boolean,
  },
  computed: {
    segmentStateClass() {
      const state = 'c-study-link_segment--';

      return this.isObfuscated
        ? state + 'obfuscated'
        : '';
    },
    dashingStateClass() {
      const state = 'c-study-link_ray-dashing--';

      return this.isObfuscated
        ? state + 'obfuscated'
        : state + 'animated';
    },
  },
  // The length of a line (or rather, its endpoint coordinates x2 and y2) is determined by the
  // dimensions of that respective axis (e.g., X for Width, Y for Height) multiplied by a
  // constant of 1.25 (0.625 * 2). In this case, x2 is 450, and y2 is 312.5
}
</script>

<template>
  <svg
    class="l-study-link"
    viewBox="-100 -100 200 200"
  >
    <g
      v-for="studyCoord of derivative"
      class="c-study-link"
    >
      <line
        class="c-study-link_segment"
        :class="segmentStateClass"
        :x2="( studyCoord[1] - id[1] ) * 450"
        :y2="( studyCoord[0] - id[0]  ) * 312.5"
      />
      <line
        class="c-study-link_ray-dashing"
        :class="dashingStateClass"
        :x2="( studyCoord[1] - id[1] ) * 450"
        :y2="( studyCoord[0] - id[0]  ) * 312.5"
      />
    </g>
  </svg>
</template>

<style>
.l-study-link {
  pointer-events: none;

  width: 100%;
  height: 100%;

  overflow: visible;

  position: absolute;
  inset: 0;

  z-index: -2;
}

.c-study-link_segment {
  stroke-width: 75px;
  stroke-linecap: butt;

  opacity: 0.3;
}

.c-study-link_ray-dashing {
  stroke-width: 25px;
  stroke-dasharray: 60px 20px;

  opacity: 0.4;
}
</style>