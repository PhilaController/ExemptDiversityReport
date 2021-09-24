<template>
  <div
    id="user-controls-wrapper"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <!-- Data Selection -->

    <div class="guide-title">Data Selection</div>
    <Category @change="(value) => $emit('category-change', value)" />
    <RaceBreakdown
      class="mt-1"
      @change="(value) => $emit('race-breakdown-change', value)"
    />

    <!-- Sort By -->
    <div class="mt-3 guide-title">Sort By</div>
    <Sorting @change="(value) => $emit('sort-change', value)" />
  </div>
</template>

<script>
import Sorting from "./Sorting";
import RaceBreakdown from "./RaceBreakdown";
import Category from "./Category";

export default {
  name: "UserControls",
  components: {
    Sorting,
    RaceBreakdown,
    Category,
  },
};
</script>

<style>
.guide-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
}
</style>

