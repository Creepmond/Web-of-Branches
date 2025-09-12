<script>
import Header from "@/component/article/Header.vue";
import SideInfographic from "@/component/article/SideInfographic.vue";

export default {
  name: "GameUIFixed",
  components: {
    Header,
    SideInfographic,
  },
};
</script>

<template>
  <Header />
  <SideInfographic />
</template>

<style>
.o-fixed-ui {
  padding: 1em 1.2em;

  position: fixed;

  z-index: 2;
}

.o-fixed-ui::after {
  content: '';
  
  position: absolute;
  inset: 0;
}
</style>