<template>
  <div id="category-select-wrapper">
    <v-select
      v-model="selectedCategory"
      :items="options"
      label=""
      outlined
      dense
      hide-details
      :ripple="false"
      id="category-select"
      @change="handleChange"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      selectedCategory: "all",
    };
  },
  computed: {
    options() {
      // Determine executive labels
      let new_executive, executive;
      if (this.$vuetify.breakpoint.xs) {
        executive = "Executive Exempt Employees";
        new_executive = "New Executive Exempt Hires";
      } else {
        executive = "Exempt Employees, Salaries at Least $90K";
        new_executive = "New Exempt Hires, Salaries at Least $90K";
      }

      return [
        { text: "All Exempt Employees", value: "all" },
        {
          text: executive,
          value: "executive",
        },
        { text: "New Exempt Hires", value: "new" },
        {
          text: new_executive,
          value: "new_executive",
        },
      ];
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style>
.v-list-item__title {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}
#category-select {
  background-color: transparent !important;
  border-width: 0px !important;
}
.v-select__selection {
  font-size: 1.1rem !important;
  line-height: 1.6rem !important;
}
#category-select-wrapper {
  width: 500px;
  max-width: 100%;
}

@media screen and (max-width: 600px) {
  .v-menu__content {
    left: 0px !important;
  }
}
</style>


