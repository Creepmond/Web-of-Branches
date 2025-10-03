<script>
import FunctionOrigin from "./FunctionOrigin.vue";

export default {
  name: "Function",
  components: { FunctionOrigin, },

};
</script>

<template>
  <div class="o-fixed-ui o-function">
    <FunctionOrigin />
  </div>
</template>

<style>
.o-function {
  inset: auto 8px 8px auto;
}
</style>