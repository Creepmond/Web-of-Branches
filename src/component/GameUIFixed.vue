<script>
import Header from "@/component/article/header/Header.vue";
import Metapanel from "@/component/article/metapanel/Metapanel.vue";

export default {
  name: "GameUIFixed",
  components: {
    Header,
    Metapanel,
  },
};
</script>

<template>
  <Metapanel />
  <Header />
</template>

<style>
.o-fixed-ui {
  pointer-events: none;

  position: fixed;

  z-index: 2;
}

.o-fixed-ui span {
  pointer-events: auto;
  
  font-size: 15px;
}
</style>