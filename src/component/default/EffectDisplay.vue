<script>
import { setUpdateloop, clearUpdateloop }  from "@/core/interval.js";
import { isDecimal, isFunction, isNumber } from "@/utility/typecheck.js";

// From AD at 'https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/components/EffectDisplay.vue'

export default {
  name: "EffectDisplay",
  props: {
    config: {
      type: Object,
      default: undefined,
      required: false,
    },
    br: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      default: "Currently:",
      required: false,
    },
    ignoreCapped: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      isVisible: false,
      effectValue: 0,
      // Number.MAX_VALUE doesn't really matter here, but we need it because
      // undefined values are not allowed for data properties
      cap: Number.MAX_VALUE,
      hasCap: false,

      frameId: null,
    };
  },
  computed: {
    reachedCap() {
      return this.hasCap && this.reachedCapFunction();
    },
    labelDisplay() {
      if (this.config.noLabel) return "";
      return `${this.reachedCap && !this.ignoreCapped ? "Capped:" : this.label} `;
    },
    effectDisplay() {
      return this.formatEffect?.(this.reachedCap ? this.cap : this.effectValue);
    }
  },
  watch: {
    config: {
      immediate: true,
      handler(config) {
        this.updateEffect = () => { };
        this.updateCap = () => { };
        const effect = config?.effect;
        const formatEffect = config?.formatEffect;
        this.isVisible = effect !== undefined && formatEffect !== undefined;
        if (!this.isVisible) return;
        this.formatEffect = formatEffect;

        if (isNumber(effect)) {
          this.effectValue = effect;
          return;
        }

        if (isDecimal(effect)) {
          //! What is this?
          this.effectValue = Decimal.fromDecimal(effect);
          return;
        }

        if (!isFunction(effect)) {
          throw new Error(`EffectDisplay config.effect has ` +
            ` unsupported type "${typeof effect}"`);
        }

        const value = effect();

        if (isNumber(value)) {
          this.effectValue = value;
          this.updateEffect = () => this.effectValue = effect();
        } else if (isDecimal(value)) {
          this.effectValue = Decimal.fromDecimal(value);
          this.updateEffect = () => this.effectValue.copyFrom(effect());
        } else {
          throw new Error(`EffectDisplay config.effect is a function which returns` +
            ` unsupported type "${typeof effect}"`);
        }

        let cap = config.cap;
        /*
        if (config.reachedCap !== undefined) {
          // If the config has a reachedCap, we assume its effect value calculation
          // takes account of the cap itself, so we don't have to.
          cap = () => this.effectValue;
          this.reachedCapFunction = config.reachedCap;
        }
        */

        if (cap === undefined) return
        
        if (config.reachedCap === undefined) {
          this.reachedCapFunction = isNumber(value)
            ? () => this.effectValue >= this.cap
            : () => this.effectValue.gte(this.cap);
        }

        if (isNumber(cap)) {
          this.cap = cap;
          this.hasCap = true;
          return;
        }

        if (isDecimal(cap)) {
          this.cap = Decimal.fromDecimal(cap);
          this.hasCap = true;
          return;
        }

        if (isFunction(cap)) {
          this.updateCap = () => {
            this.cap = cap();
            this.hasCap = this.cap !== undefined;
          };
          this.updateCap();
          return;
        }

        throw new Error(`EffectDisplay config.cap is a function which returns` +
          ` unsupported type "${typeof effect}"`);
      }
    },
  },
  methods: {
    update() {
      this.updateEffect?.();
      this.updateCap?.();

      this.frameId = setUpdateloop(this.update);
    }
  },
  beforeMount() {
    this.updateEffect = () => { };
    this.updateCap = () => { };
  },
  mounted() {
    this.frameId = setUpdateloop(this.update);
  },
  beforeUnmount() {
    clearUpdateloop(this.frameId);
    this.frameId = null;
  },
};//v-if="isVisible && effectDisplay !== undefined" 
</script>

<template>
  <span class="c-effect_display">
    <br v-if="br">
    {{ labelDisplay }}{{ effectDisplay }}
  </span>
</template>