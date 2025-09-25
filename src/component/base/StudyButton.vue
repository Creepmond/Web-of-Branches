<script>
import StudyButtonFace from "./StudyButtonFace.vue";
import StudyLink from "./StudyLink.vue";

export default {
  name: "StudyButton",
  props: {
    id: Array,
    imperativeIsBought: Boolean,
    imperativeIsAvailable: Boolean,
  },
  emits: ['purchase', 'available'],
  components: {
    StudyButtonFace,
    StudyLink,
  },
  data() { return {
    isAvailable: false,
    isBought: false,

    frameId: 0,
  }},
  computed: {
    StudyInstance() {
      return Study(this.id);
    },
    allDerivative() {
      return this.StudyInstance.allDerivative
    },
    isBranchNode() {
      return this.StudyInstance.isBranchNode
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      if (this.isBought) {
        return state + 'bought';
      } else if (this.imperativeIsBought && this.isAvailable) {
        return state + 'available';
      } else if (this.imperativeIsAvailable || this.imperativeIsBought) {
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
    isAvailable(value) {
      this.StudyInstance.isAvailable = value;
      this.$emit('available', this.id);
    },
    imperativeIsBought: {
      handler() {
        this.StudyInstance.imperativeIsBought = true;
        this.update();
      },
      immediate: true,
    },
  },
  methods: {
    update() {
      if (this.isBought || !this.imperativeIsBought) return;

      this.isAvailable = player.seed.gte(this.StudyInstance.cost);

      this.frameId = requestAnimationFrame(this.update);
    },
    purchase() {
      if (this.isBought || !this.isAvailable || !this.imperativeIsBought) return;

      this.$emit('purchase', this.id);

      Currency.seed.sub(this.StudyInstance.cost);

      this.StudyInstance.purchase();
      if (this.StudyInstance.effectInfo.type === 'callback')
        this.StudyInstance.effect;

      this.isBought = true;
      this.isAvailable = false;
    },
    changeLastHoveredStudy() {
      if ( !this.imperativeIsAvailable ) return;
      if ( rmRef(player.last.hoveredStudy) === rmRef(this.id) ) return;

      player.last.hoveredStudy = this.id;
    },
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
      :class="availabilityClass"
      @click.exact="purchase"
      @mouseenter="changeLastHoveredStudy"
    > <!-- Warning: No mobile support here! actually... this mechanic is a no mobile-support,
    anyway so idk -->
      <StudyButtonFace
        :isObfuscated="!imperativeIsAvailable"
        :rawName="StudyInstance.name"
        :rawDesc="StudyInstance.description"
        :cost="StudyInstance.cost"
      />
    </button>
    <StudyLink
      v-bind:id
      v-bind:allDerivative
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
  inset: -40px auto auto 0;
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