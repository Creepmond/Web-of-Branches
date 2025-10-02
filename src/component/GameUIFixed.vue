<script>
import Header from "@/component/article/header/Header.vue";
import SideMetapanel from "@/component/article/metapanel/Metapanel.vue";

export default {
  name: "GameUIFixed",
  components: {
    Header,
    SideMetapanel,
  },
};
</script>

<template>
  <Header />
  <SideMetapanel />
</template>

<style>
.o-fixed-ui {
  pointer-events: none;

  /* padding: 12px 16px 16px; */

  position: fixed;

  z-index: 2;
}

.o-fixed-ui span {
  pointer-events: auto;
  
  font-size: 15px;
}
</style>