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

  <!-- Fixed UI (Anything that covers a lot of the screen in general, really) is something Mobile
  is crying about. There should be a particular handler when dealing with the rest of Fixed
  UI (e.g., Infographics, and such if any more are alike). It can be dealt with for a Settings
  Modal, or something. -->
  <SideInfographic />
</template>

<style>
.o-fixed-ui {
  padding: 1em 1.2em;

  position: fixed;

  z-index: 2;
}
</style>