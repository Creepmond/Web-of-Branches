<script>
export default {
  name: "Toggle",
  props: {
    modelValue: Boolean,
    on: String,
    off: String,
  },
  emits: ['update:modelValue'],
  data() { return {
    isEnabled: false,
  }},
  methods: {
    toggle() {
      this.isEnabled = !this.isEnabled;
      this.$emit('update:modelValue', this.isEnabled);
    }
  },
  beforeMount() {
    this.isEnabled = this.modelValue;
  },
};
</script>

<template>
  <button
    class="o-default-toggle"
    @click="toggle"
  >
    <span 
      v-if="isEnabled"
      class="c-default-toggle--enabled"
    >
      {{ on || 'On' }}
    </span>
    <span
      v-else
      class="c-default-toggle--disabled"
    >
      {{ off || 'Off' }}
    </span>
  </button>
</template>

<style>
.o-default-toggle {
  pointer-events: auto;
  background: none;

  padding: 0 4px;
}

.o-default-toggle > * {
  cursor: pointer;

  display: block;
}
</style>