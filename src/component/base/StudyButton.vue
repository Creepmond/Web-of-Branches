<script>
import StudyButtonFace from "./StudyButtonFace.vue";

export default {
  name: "StudyButton",
  props: {
    id: Array,
    imperativeIsBought: Boolean,
    imperativeIsAvailable: Boolean,
  },
  components: { StudyButtonFace, },
  data() { return {
    isAvailable: false,
    isBought: false,

    frameId: 0,
  }},
  computed: {
    StudyInstance() {
      return Study(this.id);
    },
    availabilityClass() {
      const state = 'o-prim-study--';

      if (this.isBought) {
        return state + 'bought';
      } else if (this.imperativeIsBought && this.isAvailable) {
        return state + 'available';
      } else if (this.imperativeIsAvailable) {
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
    isAvailable() {
      this.StudyInstance.isAvailable = true;
      this.$emit('available', this.id);
    },
    imperativeIsBought() {
      this.StudyInstance.imperativeIsBought = true;
      this.update();
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

      player.seed = player.seed.sub(this.StudyInstance.cost);

      this.StudyInstance.purchase();
      this.isBought = true;
    },
    changeLastHoveredStudy() {
      if ( !this.imperativeIsAvailable ) return;
      if ( rmRef(player.lastHoveredStudy) === rmRef(this.id) ) return;

      player.lastHoveredStudy = this.id;
    },
  },
};
</script>

<template>
  <div class="l-prim-study__positioning" :style="position">
    <div class="l-prim-study-id">
      <span class="c-prim-study-id">
        {{ id }}
      </span>
    </div>
    <button
      class="o-prim-study"
      :class="availabilityClass"
      @click="purchase"
      @mouseenter="changeLastHoveredStudy"
    > <!-- Warning: No mobile support here! actually... this mechanic is a no mobile-support,
    anyway so idk -->
      <StudyButtonFace
        :isObfuscated="false"
        :rawName="StudyInstance.name"
        :rawDesc="StudyInstance.description"
        :cost="StudyInstance.cost"
      />
    </button>
  </div>
</template>

<style>
.l-prim-study__positioning {
  position: absolute;
}

.l-prim-study-id {
  position: relative;
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