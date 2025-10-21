<script>
import GameStorage from "@/core/storage.js";

export default {
  name: "HeaderSaves",
  methods: {
    saveGame() {
      GameStorage.save();
    },
    loadGame() {
      GameStorage.load();
    },
  },
};
</script>

<template>
  <div class="l-header-content--save-grid">
    <button
      class="o-button o-header--save"
      @click.exact="saveGame"
    >
      <span class="o-header--save-text_manual">
        Manual Save
      </span>
    </button>
    <button
      class="o-button o-header--save"
      @click.exact="loadGame"
    >
      <span class="o-header--save-text_manual">
        Manual Load
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

  padding: 4px 8px;

  display: inline;
}

/* Selector specificity */
button.o-header--save > span {
  font-size: 16px;
}
</style>