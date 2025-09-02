<script>
export default {
  name: "GameUIFixed",
}
</script>

<template>
  <div class="c-header-currency">
    <span class="o-currency--seeds">
      Seeds: 1
    </span>
  </div>
</template>

<style>
.c-header-currency {
  padding: 1em 1.2em;

  position: fixed;
  inset: 10px auto auto 10px;
}

.c-header-currency::before {
  content: '';
  
  position: absolute;
  inset: 0;
}
</style>