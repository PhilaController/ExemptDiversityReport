<template>
  <div class="section" id="explorer">
    <p>
      In the following visualizations, the diversity data for each City
      department or elected office is presented in two separate heatmaps, one
      for all departments that fall under the Mayor's authority (left) and one
      for independently elected offices (right). Rows of the heatmap show
      results for a specific department while columns represent different races
      and ethnicities. The data is visualized relative to Philadelphia's overall
      population statistics according to the latest Census data. The color gray
      indicates that a particular race or ethnicity is represented at the same
      level as the city's Census, while the colors red and blue indicate
      overrepresentation and underrepresentation, respectively.
    </p>

    <p>
      Using the buttons below, data can be broken out into four categories: all
      exempt employees, exempt employees hired in {{ reportTag }}, exempt
      employees with salaries of at least $90,000, and the subset of new hires
      with salaries of at least $90,000.
    </p>

    <!-- User info -->
    <UserInfo
      @sort-change="
        (value) => {
          sortByToggle = value;
        }
      "
      @race-breakdown-change="
        (value) => {
          raceBreakdownToggle = value;
        }
      "
    />

    <!-- Heatmap viz -->
    <DataViz
      v-if="data[category] !== null"
      :data="data[category]"
      :censusData="censusData"
      :raceBreakdownToggle="raceBreakdownToggle"
      :sortByToggle="sortByToggle"
    />
  </div>
</template>


<script>
import { getReportTag, fetch } from "@/utils";
import UserInfo from "./UserInfo";
import DataViz from "./DataViz";

export default {
  name: "Explorer",
  components: {
    UserInfo,
    DataViz,
  },
  data() {
    return {
      reportTag: getReportTag(),
      data: { all: null, executive: null, new: null, new_executive: null },
      censusData: null,
      sortByToggle: "Number of Employees",
      raceBreakdownToggle: "All Races/Ethnicities",
    };
  },
  computed: {
    category() {
      return this.$route.params.category;
    },
  },
  async created() {
    // Either "all", "executive", "new", "new_executive"
    let category = this.category;

    // Fetch the data for the current category
    this.data[category] = await fetch(category);

    // Fetch the census data too
    this.censusData = await fetch("census");
    this.censusData = new Map(
      this.censusData.map((d) => [d.race, +d.percentage])
    );
  },
  methods: {
    handleSortChange(value) {
      console.log(value);
    },
    handleRaceBreakdownChange(value) {
      console.log(value);
    },
  },
  watch: {
    // eslint-disable-next-line
    async $route(to, from) {
      // Load the new data if we need to
      let category = to.params.category;
      if (this.data[category] === null)
        this.data[category] = await fetch(category);
    },
  },
};
</script>

