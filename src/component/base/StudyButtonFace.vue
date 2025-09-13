<script>
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
  watch: {
    isObfuscated(value) {
      if (value) {
        this.name = this.obfuscateText(this.name);
      } else {
        this.stirText()
        this.name = this.rawName;
      };
    },
  },
  computed: {
    studyCost() {
      return format(this.cost);
    },
  },
  methods: {
    obfuscateText(text) {
      return text
        .replaceAll(/<\/?sup>/g, '')
        .split('')
        .map( char => char.caesar() )
        .join('');
    },
    stirText(text) {
      set
    }
  },
  mounted() {
    if (!this.isObfuscated) return;

    this.obfuscateText();
  }
};
</script>

<template>
  <div class="l-prim-study l-prim-study-header">
    <span class="c-prim-study-name" v-html="rawName" />
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