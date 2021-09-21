<template>
  <div id="sort-toggle">
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
        aria-label="Sort data by number of employees"
      >
        Employees
      </v-btn>
      <v-btn
        class="h-100 flex-grow-1"
        :ripple="false"
        aria-label="Sort data by percent of White employees"
      >
        Percent White
      </v-btn>
      <v-btn
        class="h-100 flex-grow-1"
        :ripple="false"
        aria-label="Sort data alphabetically by department name"
      >
        Department Name
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
      id="sort-select"
      @change="handleChange"
    ></v-select>
  </div>
</template>


<script>
export default {
  name: "Sorting",
  data() {
    return {
      values: ["Number of Employees", "Percent White", "Department Name"],
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
#sort-toggle .v-btn-toggle button {
  min-height: 40px !important;
}
#sort-toggle {
  width: 500px;
  max-width: 100%;
}

#sort-select {
  background-color: transparent !important;
  border-width: 0px !important;
}
</style>