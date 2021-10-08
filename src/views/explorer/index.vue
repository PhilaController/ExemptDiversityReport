<template>
  <div class="section" id="explorer">
    <p>
      In the following visualizations, the diversity data for each City
      department or independent office is presented in two separate heatmaps,
      one for all departments that fall under the Mayor's authority
      <span v-if="!$vuetify.breakpoint.mobile">(left)</span> and one for
      independently elected offices<span v-if="!$vuetify.breakpoint.mobile">
        (right)</span
      >. Rows of the heatmap show results for a specific department while
      columns represent different races and ethnicities. The data is visualized
      relative to Philadelphia's overall population statistics according to the
      latest Census data. The color gray indicates that a particular race or
      ethnicity is represented at the same level as the city's Census, while the
      colors red and blue indicate overrepresentation and underrepresentation,
      respectively.
    </p>
    <p>
      Data can be broken out into four categories: all exempt employees, exempt
      employees hired in {{ reportTag }}, exempt employees with salaries of at
      least $90,000, and the subset of new hires with salaries of at least
      $90,000.
    </p>

    <!-- User info -->
    <UserInfo
      @sort-change="
        (value) => {
          sortByToggle = value;
        }
      "
      @category-change="
        (value) => {
          category = value;
        }
      "
      @race-breakdown-change="
        (value) => {
          raceBreakdownToggle = value;
        }
      "
    />

    <!-- Heatmap viz -->
    <transition name="fade">
      <DataViz
        v-show="data[category] !== null"
        :data="data[category]"
        :censusData="censusData"
        :raceBreakdownToggle="raceBreakdownToggle"
        :sortByToggle="sortByToggle"
        :key="`${category}-data-viz`"
      />
    </transition>
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
      category: "all",
    };
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
    async category(value) {
      // Load the new data if we need to
      if (this.data[value] === null) this.data[value] = await fetch(value);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
