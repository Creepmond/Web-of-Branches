<script>
// Reads for <sup>, </sup>, <sub>, and </sub>, if a Study ever uses it.
const rawTextRegex = /<\/?su[pb]>/g;

// Transition time (ms) for unobfuscating
const unobfuscationSpan = 1000;

// Non-reactive variables
let rawaName = '';
let rawaDesc = '';

export default {
  name: "StudyButtonFace",
  props: {
    isObfuscated: Boolean,
    rawName: String,
    rawDesc: String,
    cost: Decimal,
  },
  data() { return {
    name: '',
  }},
  /*
  watch: {
    isObfuscated(value) {
      if (value) return;

      this.stirName();
    },
  },
  */
  computed: {
    studyCost() {
      return format(this.cost);
    },
  },
  methods: {
    stirName() {
      /*
      const tickrate = unobfuscationSpan / this.name.length;

      const charsNotReturned = rawName.split('');
      const charsToReturn = this.name.split('');

      const mappedChar = new Map();
      charsToReturn.forEach(char => {
        mappedChar.set(charsNotReturned[char], charsToReturn[char]);
      });
      */

      /*
      const handleTick = () => {
        const char = charsNotReturned.random();
        this.name = 0;

        this.name === rawName
          ? this.name = this.rawName
          : setTimeout(handleTick, tickrate);
      }

      setTimeout(handleTick, tickrate);
      */
    }
  },
  mounted() {
    if (!this.isObfuscated) return;

    // rawName = this.rawName.replaceAll(rawTextRegex, '');
    // this.name = this.name.obfuscateAll();
  },
};
</script>

<template>
  <div class="l-prim-study l-prim-study-header">
    <span
      class="c-prim-study-name"
      v-html="rawName"
    />
  </div>
  <div class="l-prim-study">
    <span class="c-prim-study-info">
      {{ rawDesc }}
    </span>
    <span class="c-prim-study-info">
      Cost: {{ studyCost }} Seed
    </span>
  </div>
</template>

<style>
.l-prim-study__face {

}

.l-prim-study {
  width: fit-content;
  margin: 0 auto;
}

.c-prim-study-name {
  font-size: 30px;
}

.c-prim-study-info {
  display: block;
}
</style>