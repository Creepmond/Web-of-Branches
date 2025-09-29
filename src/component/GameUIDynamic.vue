<script>;
import Tree from "./Tree.vue";

import { setUpdateloop } from "@/core/interval"

const htmlDOM = document.querySelector('html');

const VELOCITY_STRENGTH = 1.71; // Euler's minus one. It was done solely on a whim
const VELOCITY_THRESHOLD = 0.1;
const MAX_HISTORY_LENGTH = 5;

export default {
  name: "GameUIDynamic",
  components: { Tree, },
  data() { return {
    screenCoord: { X: -140, Y: -80 }, // See the <style> why these are the values
    initMouseCoord: { X: 0, Y: 0 },
    diffMouseCoord: { X: 0, Y: 0 },
    
    zoomTarget: { X: 0, Y: 0 },
    zoomLevel: 0,

    // For Physics
    physicsIsActive: false,
    screenSlip: 0,
    mouseCoordHist: [],

    // Physics values
    velocity: 0,
    angleAvg_rad: 0,
    directionHist: [],
  }},

  // Not sure if it's a better habit to remain stagnant where each key of an SFC rests. I mean,
  // it's usually components, props and emits, then reactive data, watchers, computed, methods,
  // then the lifecycle hooks. I've accidently made a pattern, but this situation makes more
  // sense to place lifecycle hooks before methods. Well, it doesn't ultimately matter but a
  // thought's a thought
  mounted() {
    htmlDOM.addEventListener('pointerdown', this.handleStart);
    htmlDOM.addEventListener('pointerup', this.handleEnd);

    this.zoomLevel = player.option.zoomLevel;
    htmlDOM.addEventListener('wheel', this.handleZoom);
  },
  methods: {
    handleStart(e) {
      if (e.target.className.includes('vue-slider')) return;

      this.physicsIsActive = player.physics.isEnabled;
      this.screenSlip = player.physics.screenSlipperiness;

      if (this.physicsIsActive)
        this.mouseCoordHist.push({ X: e.clientX, Y: e.clientY, T: Date.now() });

      this.initMouseCoord = { X: e.clientX, Y: e.clientY };

      htmlDOM.addEventListener('pointermove', this.handleMove);
    },
    
    handleMove(e) {
      this.diffMouseCoord = { X: e.clientX, Y: e.clientY };

      if (this.physicsIsActive) {
        this.mouseCoordHist.push({ X: e.clientX, Y: e.clientY, T: Date.now() });

        if (this.mouseCoordHist.length < 2) return;
        if (this.mouseCoordHist.length > MAX_HISTORY_LENGTH) this.mouseCoordHist.shift();
      }

      this.calculateScreenMovement();
      this.initMouseCoord = this.diffMouseCoord;
    },

    handleEnd() {
      htmlDOM.removeEventListener('pointermove', this.handleMove);

      player.last.screenCoord = this.screenCoord;

      if (!this.physicsIsActive || this.mouseCoordHist.length < 2) return;
      this.calculatePhysics();
      this.mouseCoordHist = [];

      if (this.screenSlip === 0) return;
      this.calculateSlipperiness();
    },

    handleZoom(e) {
      if (e) this.zoomLevel += e.deltaY / 4000;

      this.zoomLevel = this.zoomLevel.valueOf().clamp(0.2, 2);
    },



    calculatePhysics() {
      // This actually is forEach but non-inclusive to the final length value, basically only
      // done four times a trigger when mouseCoordHistory is at full length (5). Probably
      // could've done with an if (...) { continue }, though I assume that wouldn't be as
      // optimized
      for (let i = 1; i < this.mouseCoordHist.length; i++) {
        const dx = this.mouseCoordHist[i].X - this.mouseCoordHist[i-1].X;
        const dy = this.mouseCoordHist[i].Y - this.mouseCoordHist[i-1].Y;
        const length = Math.hypot(dx, dy);

        if (length > 0)
          this.directionHist.push({ X: dx / length, Y: dy / length });

        if (this.directionHist.length > MAX_HISTORY_LENGTH)
          this.directionHist.shift();
      }

      const avgDirection = { X: 0, Y: 0 };
      const dirLength = this.directionHist.length;

      this.directionHist.forEach(vector => {
        avgDirection.X += vector.X;
        avgDirection.Y += vector.Y;
      });

      if (dirLength > 0) {
        avgDirection.X / dirLength;
        avgDirection.Y / dirLength;
      }

      this.angleAvg_rad = Math.atan2(avgDirection.Y, avgDirection.X) 

      const init = this.mouseCoordHist[0];
      const diff = this.mouseCoordHist[this.mouseCoordHist.length - 1];

      const delta = {
          X: diff.X - init.X,
          Y: diff.Y - init.Y,
          T: diff.T - init.T,
      };

      this.velocity =
        ( Math.sqrt(delta.X ** 2 + delta.Y ** 2) ) / delta.T * VELOCITY_STRENGTH;
    },

    calculateScreenMovement() {
      // This is just from Lines 128-135, but I compressed it since the structure is readable
      // like this anyways. This uses the initMouseCoord and diffMouseCoord whereas
      // calculatePhysics() is derived from the mouseCoordHistory is because I couldn't figure
      // out how to make init *not* the same as diff. As you could have saw, after handleMove()
      // is calculated, init is already equal to diff
      this.screenCoord.X += this.diffMouseCoord.X - this.initMouseCoord.X;
      this.screenCoord.Y += this.diffMouseCoord.Y - this.initMouseCoord.Y;
    },

    calculateSlipperiness() {
      if (this.velocity < VELOCITY_THRESHOLD) return;

      const angle = this.angleAvg_rad;

      this.screenCoord.X += Math.cos(angle) * this.velocity;
      this.screenCoord.Y += Math.sin(angle) * this.velocity;

      //* See '@/component/article/HeaderOption.vue' at around Line 33. The value of screen 
      // slipperiness never actually reaches less than 0.9 (unless it's already at 0 of
      // course), and that's because the effect is way too rigid less than 0.9, so every value
      // is at 0.901-0.999. Of course, I  make the calculated value a root, but the problem is
      // twofold with the same rigidness plus it probably affects performance a little more
      // than dealing with the value 0.901-0.999 itself
      this.velocity *= this.screenSlip;

      // This has a hilarious side-effect of being affected by tickrate. I'm not sure if I'm
      // inclined to support this behaviour (e.g., making velocity stronger based on tickrate),
      // or just going back to requestAnimationFrame(). Both are great, to be fair.
      setUpdateloop(this.calculateSlipperiness);
    },
  },
  computed: {
    uiPos() {
      return {
        X: this.screenCoord.X,
        Y: this.screenCoord.Y,
      }
    },
    bgPos() {
      const parallax = player.option.parallax;
      const zoom = player.option.zoomLevel;

      return {
        X: this.screenCoord.X * parallax / zoom,
        Y: this.screenCoord.Y * parallax / zoom,
      };
    }
  },
};
</script>

<template>
  <article
    id="user-interface"
    :style="`
      transform:
        scale(${zoomLevel})
        translate(${uiPos.X}px, ${uiPos.Y}px);
    `"
  >
    <Tree />
  </article>
  <figure
    id="background"
    :style="`
      width: ${101 / zoomLevel}vw;
      height: ${101 / zoomLevel}vh;
      transform: scale(${zoomLevel});
      background-position: ${bgPos.X}px ${bgPos.Y}px;
    `"
  />
  <!--Viewports here are 101 rather than 100 because of fractional pixels causing the very
  rim to often not showing properly. Or I'm going insane. Better to be safe than sorry-->
</template>

<style>
#user-interface {
  
}

#background {
  /* The pixel difference on translate is based on a standard study's half-size */
  background-position: -140px -80px;

  width: 101vw;
  height: 101vh;

  position: fixed;
  z-index: -3;
}
</style>