<script>
import format, { pluralize } from "@/utility/format.js";

// Reads for <span class="f-sup">, <span class="f-sub">, and </span>, if a Study ever uses it.
const rawTextRegex = /<\/?span( class)?(="f-su[pb]")?>/g;

// Transition time (ms) for unobfuscating
const unobfuscationSpan = 1000;

export default {
  name: "StudyButtonFace",
  props: {
    isObfuscated: Boolean,
    rawName: String,
    rawDesc: String,
    cost: Decimal,
  },
  data() { return {
    cleanName: '',
    cleanDesc: '',
    name: '',
    desc: '',
  }},
  watch: {
    isObfuscated(value) {
      if (value) return;

      this.stirStudyText('name', this.cleanName, this.rawName);
      this.stirStudyText('desc', this.cleanDesc, this.rawDesc);
    },
  },
  computed: {
    studyCost() {
      const value = format(this.cost);
      const name = pluralize("Seed", this.cost);
      return { value, name };
    },
  },
  methods: {
    stirStudyText(targetKey, cleanText, rawText) {
      const tickrate = unobfuscationSpan / this[targetKey].length;

      const charToReturn = cleanText.split('');
      const charNotReturned = this[targetKey].split('');

      const mappedChar = [];
      charToReturn.forEach((_, index) => {
        mappedChar.push({
          toReturn: charToReturn[index],
          notReturned: charNotReturned[index], 
        });
      });

      const handleTick = () => {
        const char = mappedChar.random();
        const mappedText = this[targetKey].split('');
        mappedText[mappedChar.indexOf(char)] = char.toReturn;

        this[targetKey] = mappedText.join('');

        this[targetKey] === cleanText
          ? this[targetKey] = rawText
          : setTimeout(handleTick, tickrate);
      }

      setTimeout(handleTick, tickrate);
    }
  },
  mounted() {
    this.cleanName = this.rawName.replaceAll(rawTextRegex, '');
    this.cleanDesc = this.rawDesc.replaceAll(rawTextRegex, '');

    if (this.isObfuscated) {
      this.name = this.cleanName.obfuscateAll();
      this.desc = this.cleanDesc.obfuscateAll();
    } else {
      this.name = this.cleanName;
      this.desc = this.cleanDesc;
    }
  },
};
</script>

<template>
  <div class="l-prim-study l-prim-study-header">
    <span
      class="c-prim-study-name"
      v-html="name"
    />
  </div>
  <div class="l-prim-study">
    <span
      class="c-prim-study-info"
      v-html="desc"
    />
    <span
      v-if="!isObfuscated"
      class="c-prim-study-info"
    >
      Cost: {{ studyCost.value }} {{ studyCost.name }}
    </span>
  </div>
</template>

<style>
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