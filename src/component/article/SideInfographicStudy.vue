<script>
export default {
  name: "SideInfographicStudy",

}
</script>

<template>
  <div class="l-infographic-header">
    <span class="c-infographic-header">
      Sprout
    </span>
  </div>
  <div class="l-infographic-data">
    <span class="c-infographic-data">
      <span class="c-infographic-identifier">Description:</span>
      Slowly produce seeds
    </span>
    <span class="c-infographic-data">
      <span class="c-infographic-identifier">Specified:</span>
      Increase Seeds rate by +1/s
    </span>
    <span class="c-infographic-data">
      <span class="c-infographic-identifier">Effect:</span>
      +1/s Seed
    </span>
    <span class="c-infographic-data">
      <span class="c-infographic-identifier">Compound:</span>
      +152/s Seeds
    </span>
  </div>
</template>

<style>
.l-infographic-header {
  font-size: 1.4em;
}

.l-infographic-data > * {
  text-align: start;

  display: block;
}

.c-infographic-identifier {
  font-size: 0.6em;
}
</style>