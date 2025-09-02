<script>
export default {
  name: "GenericStudyButton",
}
</script>

<template>
  <div class="o-prim-study">
    <div class="l-prim-study l-prim-study-header">
      <span class="c-prim-study-name">
        The Root
      </span>
    </div>
    <div class="l-prim-study">
      <span class="c-prim-study-info c-prim-study-info--desc">
        Unlock the first Branch
      </span>
      <button class="c-prim-study-info c-prim-study-info--buy">
        Cost: 1 Seed
      </button>
    </div>
  </div>
</template>

<style>
.o-prim-study {
  height: 160px;
  width: 280px;

  border-radius: 2px;

  display: flex;
  flex-direction: column;
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

.l-prim-study {
  width: 50%;
  margin: 0 auto;
}
</style>