<script>
import Header from "@/component/article/Header.vue";
import SideMetapanel from "@/component/article/SideMetapanel.vue";

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

  <!-- Fixed UI (Anything that covers a lot of the screen in general, really) is something Mobile
  is crying about. There should be a particular handler when dealing with the rest of Fixed
  UI (e.g., Metapanel, and such if any more are alike). It can be dealt with for a Settings
  Modal, or something. -->
  <SideMetapanel />
</template>

<style>
.o-fixed-ui {
  padding: 12px 16px 16px;

  position: fixed;

  z-index: 2;
}
</style>