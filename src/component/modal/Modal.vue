<script>
export default {
  name: "Modal",
}
</script>

<template>
  <dialog id="c-modal">
    <div id="c-modal-content">
      Am a modal baby
    </div>
  </dialog>
</template>

<style>
#c-modal-content {
  background-color: white;

  transform: translate(-50%, -50%);

  position: fixed;
  inset: 50% auto auto 50%;
}
</style>