<template>
  <div>
    <DataVizGuide />
    <UserControls
      class="mt-5"
      @category-change="(value) => $emit('category-change', value)"
      @sort-change="(value) => $emit('sort-change', value)"
      @race-breakdown-change="(value) => $emit('race-breakdown-change', value)"
    />
  </div>
</template>

<script>
import DataVizGuide from "./DataVizGuide";
import UserControls from "./UserControls";

export default { name: "UserInfo", components: { DataVizGuide, UserControls } };
</script>
