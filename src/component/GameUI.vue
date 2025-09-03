<script>
  import GenericStudyButton from './GenericStudyButton.vue'

  export default {
    name: "GameUI",
    components: {
      GenericStudyButton,
    },
    computed: {

    },
  }
</script>

<template>
  <div class="layout">
    <div
      v-for="(row, index) in 3"
      :key="row"
      class="row"
      :class="{ 'offset': index % 2 !== 0 }"
    >
      <div
        v-for="column in 5"
        :key="column"
        class="column"
      >
        <GenericStudyButton />
      </div>
    </div>
  </div>
</template>

<style>
.offset {
  transform: translateX(-200px);
}

.row {
  display: flex;
  flex-wrap: nowrap;
}

.column {
  display: inline-block;
}
</style>
