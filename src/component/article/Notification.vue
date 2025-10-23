<script>
export default {
  name: "Notification",

}
</script>

<template>
  <button class="o-fixed-ui o-notification">
    <div class="o-notification-flare" />
  </button>
</template>

<style>
/*# Pesky CSS selector specificity */
.o-fixed-ui.o-notification {
  pointer-events: auto;
}

.o-notification {
  width: 64px;
  height: 64px;

  border-right-width: 1px;
  border-right-style: solid;
  border-radius: 50%;

  /* Only roughly appears on the lower quarter of the screen, or around 3/4th the viewheight */
  display: flex;
  align-self: center;

  inset: 40vh 8px 0 auto; 
}

.o-notification-flare {

}
</style>