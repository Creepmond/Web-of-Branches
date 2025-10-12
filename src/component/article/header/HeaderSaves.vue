<script>
export default {
  name: "HeaderSaves",
  
};
</script>

<template>
  <div class="l-header-content--save-grid">
    <button class="o-button o-header--save">
      <span class="o-header--save-text_manual">
        Manual Save
      </span>
    </button>
  </div>
</template>

<style>
.l-header-content--save-grid {
  pointer-events: auto;

  font-size: 32px;

  width: 8em;

  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.o-header--save {
  width: fit-content;

  display: inline;
}

/* Selector specificity */
button.o-header--save > span {
  font-size: 18px;
}
</style>