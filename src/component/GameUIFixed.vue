<script>
import Header       from "@/component/article/header/Header.vue";
import Function     from "@/component/article/function/Function.vue";
import Metapanel    from "@/component/article/metapanel/Metapanel.vue";
import Notification from "@/component/article/Notification.vue";

export default {
  name: "GameUIFixed",
  components: {
    Header,
    Function,
    Metapanel,
    Notification,
  },
};
</script>

<template>
  <Header />
  <Function />
  <Metapanel />
  <Notification />
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