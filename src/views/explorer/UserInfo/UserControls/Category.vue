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
      options: [
        { text: "All Exempt Employees", value: "all" },
        {
          text: "Exempt Employees, Salaries At Least $90K",
          value: "executive",
        },
        { text: "Newly Hired Exempts", value: "new" },
        {
          text: "Newly Hired Exempts, Salaries At Least $90K",
          value: "new_executive",
        },
      ],
      selectedCategory: null,
    };
  },
  created() {
    this.selectedCategory = this.$route.params.category;
  },
  methods: {
    handleChange(value) {
      this.$router.push(value);
    },
  },
};
</script>

<style>
.v-list-item__title {
  font-size: 1rem !important;
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
</style>


