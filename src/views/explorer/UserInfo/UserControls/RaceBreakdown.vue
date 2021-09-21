<template>
  <div id="race-breakdown-toggle">
    <!-- Radio buttons not on mobile -->
    <v-btn-toggle
      v-if="!$vuetify.breakpoint.mobile"
      class="d-flex"
      v-model="toggle"
      mandatory
      @change="handleChange"
    >
      <v-btn
        class="h-100 flex-grow-1"
        :ripple="false"
        aria-label="Show data for all races and ethnicities"
      >
        All Races/Ethnicities
      </v-btn>
      <v-btn
        class="h-100 flex-grow-1"
        :ripple="false"
        aria-label="Show the breakdown of White vs. diverse representation"
      >
        White vs. Diverse
      </v-btn>
    </v-btn-toggle>

    <!-- Dropdown on mobile -->
    <v-select
      v-if="$vuetify.breakpoint.mobile"
      v-model="toggle"
      :items="values"
      label=""
      outlined
      dense
      hide-details
      :ripple="false"
      id="race-breakdown-select"
      @change="handleChange"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "RaceBreakdown",
  data() {
    return {
      values: ["All Races/Ethnicities", "White vs. Diverse"],
      toggle: 0,
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.mobile) this.toggle = this.values[0];
  },
  methods: {
    handleChange(value) {
      // When using radio, convert from index to value
      if (!this.$vuetify.breakpoint.mobile) value = this.values[value];

      // Emit the value
      this.$emit("change", value);
    },
  },
};
</script>


<style>
#race-breakdown-toggle .v-btn-toggle button {
  min-height: 40px !important;
}
#race-breakdown-toggle {
  width: 500px;
  max-width: 100%;
}
#race-breakdown-select {
  background-color: transparent !important;
  border-width: 0px !important;
}
</style>

