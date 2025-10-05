<script>
import StudyButtonFace from "./StudyButtonFace.vue";
import StudyLink from "./StudyLink.vue";

import { setUpdateloop } from "@/core/interval.js";

let clickTargetCoord = { X: 0, Y: 0 };
let holdDuration = 0;

export default {
  name: "StudyButton",
  props: {
    id: Array,
    isBought: Boolean,

    imperativeIsBought: {
      type: Boolean,
      default: true,
    },

    imperativeIsAvailable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['purchase', 'available'],
  components: {
    StudyButtonFace,
    StudyLink,
  },
  data() { return {
    isExposed: false,
    isAvailable: false,
    isRespecced: false,
  }},
  computed: {
    StudyInstance() {
      return Study(this.id);
    },
    isBranchNode() {
      return this.StudyInstance.isBranchNode
    },
    respecClass() {
      // This might seem stupid (and because it is), but I have to expose the reactive property
      // "isRespecced" so that it tracks this whenever "isRespecced" changes. Though I realize
      // it's not as optimized, this is technically more readable(?) (in a way)
      const isRespecced = this.isRespecced;

      if (!this.isBranchNode || !Study([4,1]).effect) return;

      const state = 'o-prim-study--';

      return isRespecced && this.isBought
        ? state + 'respecced'
        : state + 'node';
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      if (this.isBought) {
        return state + 'bought';
      } else if (this.imperativeIsBought && this.isAvailable) {
        return state + 'available';
      } else if (this.isExposed || this.imperativeIsAvailable || this.imperativeIsBought)  {
        return state + 'unavailable';
      } else {
        return state + 'obfuscated';
      };
    },
    position() {
      return `inset: ${this.id[0] * 250}px auto auto ${this.id[1] * 360}px`
    },
  },
  watch: {
    imperativeIsBought: {
      handler() {
        this.StudyInstance.imperativeIsBought = true;
        this.update();
      },
      immediate: true,
    },
    isBought() {
      this.update();
    },
    isAvailable(value) {
      this.StudyInstance.isAvailable = value;
      this.$emit('available', this.id);
    },
    isRespecced(valueIsTrue) {
      valueIsTrue
        ? player.last.respeccedStudy = this.id
        : player.last.respeccedStudy = [];
    },
  },
  methods: {
    update() {
      if (this.isBought || !this.imperativeIsBought) return;

      this.isAvailable = player.seed.gte(this.StudyInstance.cost);

      setUpdateloop(this.update);
    },
    setPointerdown(e) {
      this.changeLastHoveredStudy(); // For mobile

      clickTargetCoord = { X: e.clientX, Y: e.clientY };
      holdDuration = Date.now();
    },
    tryPurchase(e) {
      // If the user moves their screen when having clicked on a study, ignore
      if (rmRef(clickTargetCoord) !== rmRef({ X: e.clientX, Y: e.clientY })) return;

      if (this.isBought) {
        const stopHold = Date.now();
        if (stopHold - holdDuration >= 250) {
          this.tryRespec();
          return;
        };
      };

      if (!this.isAvailable || !this.imperativeIsBought) return;

      this.$emit('purchase', this.id);

      Currency.seed.sub(this.StudyInstance.cost);

      this.StudyInstance.purchase();
      if (this.StudyInstance.effectInfo.type === 'callback') {
        this.StudyInstance.effect;
      }
      
      // Might be able to relgegate this to '@/core/state/study.js'
      if (this.StudyInstance.effectInfo.type === 'unlock') {
        if ( rmRef(this.id) === rmRef([4,1]) ) player.permaStudy.respecIsUnlocked = true;
      }

      this.isExposed = true;
      this.isAvailable = false;
    },
    tryRespec() {
      if (!this.isBought || !this.isBranchNode || !player.permaStudy.respecIsUnlocked) return;

      this.isRespecced = !this.isRespecced;
    },
    changeLastHoveredStudy() {
      if ( !this.imperativeIsAvailable && !this.imperativeIsBought && !this.isExposed ) return;
      if ( rmRef(player.last.hoveredStudy) === rmRef(this.id) ) return;

      player.last.hoveredStudy = this.id;
    },
  },
  mounted() {
    this.isExposed = player.studyExposedBits.hasArray(this.id);
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <span class="c-prim-study-id">
      {{ id }}
    </span>
    <button
      class="o-prim-study"
      :class="[availabilityClass, respecClass]"
      @pointerdown.exact="setPointerdown"
      @pointerup.exact="tryPurchase"
      @click.ctrl.exact="tryRespec"
      @click.meta.exact="tryRespec"
      @mouseenter="changeLastHoveredStudy"
    > <!-- Warning: No mobile support here! actually... this mechanic is a no mobile-support,
    anyway so idk -->
      <StudyButtonFace
        :isObfuscated="!imperativeIsAvailable && !imperativeIsBought"
        :rawName="StudyInstance.name"
        :rawDesc="StudyInstance.description"
        :cost="StudyInstance.cost"
      />
    </button>
    <StudyLink
      v-bind:id
      :derivative="StudyInstance.derivative"
      :isObfuscated="(!imperativeIsBought || !isBought) && !isAvailable"
    />
  </div>
</template>

<style>
.l-prim-study__positioning {
  position: absolute;
}

.c-prim-study-id {
  font-size: 30px;
  font-weight: 300;

  position: absolute;
  inset: -45px auto auto 0;
}

.o-prim-study {
  cursor: default;

  height: 160px;
  width: 280px;

  border-radius: 2px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: relative;
}

.o-prim-study::before {
  content: '';

  border-radius: 2px;

  position: absolute;

  z-index: -1;
}

.o-prim-study--obfuscated,
.o-prim-study--obfuscated span {
  cursor: move
}

.o-prim-study--available {
  cursor: pointer;
}
</style>