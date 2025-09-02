<script>
export default {
  name: "GenericStudyButton",
}
</script>

<template>
  <div class="o-prim-study">
    <span>
      Yolo
    </span>
  </div>
</template>

<style>
.o-prim-study {
  height: 140px;
  width: 280px;

  border-radius: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  position: relative;
}

.o-prim-study::before {
  content: '';

  border-radius: 2px;

  position: absolute;
  inset: -4px;

  z-index: -1;
}
</style>