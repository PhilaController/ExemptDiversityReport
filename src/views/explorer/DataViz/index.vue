<template>
  <div id="heatmaps">
    <v-row no-gutters>
      <!-- Mayoral Admin -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
        class="d-flex flex-column align-items-center"
      >
        <div class="heatmap-title">Mayoral Administration</div>
        <HeatMap
          v-if="chartData.length > 0"
          :data="dataAdmin"
          :censusData="censusData"
          :showAllRaces="showAllRaces"
          :sortBy="sortBy"
          :cellSize="cellSize"
          kind="admin"
          :marginLeft="marginLeft"
          :marginTop="marginTop"
          title="Mayoral Administration"
        />
      </v-col>

      <!-- Independent -->
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="6"
        class="d-flex flex-column align-items-center"
      >
        <div class="heatmap-title">Independent Offices</div>
        <HeatMap
          v-if="chartData.length > 0"
          :data="dataIndependents"
          :censusData="censusData"
          :showAllRaces="showAllRaces"
          :sortBy="sortBy"
          :cellSize="cellSize"
          kind="indep"
          :marginLeft="marginLeft"
          :marginTop="marginTop"
          title="Independent Offices"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeatMap from "./Heatmap.vue";
import { rollup, sum } from "d3-array";

const INDEPENDENTS = [
  "City Council",
  "First Judicial District",
  "City Controller",
  "Register of Wills",
  "District Attorney",
  "Sheriff",
  "City Commissioners",
];

export default {
  name: "DataViz",
  props: ["data", "censusData", "raceBreakdownToggle", "sortByToggle"],
  components: { HeatMap },
  computed: {
    chartData() {
      if (this.data === null || this.censusData === null) return [];

      // Create a copy to return
      let out = Object.assign([], this.data);

      // Add citywide total
      out = this.addCitywideTotal(out);

      // Add Census
      out = this.addCensusTotal(out);

      // Calculate department totals
      let deptTotals = rollup(
        out,
        (v) => sum(v, (d) => +d.count),
        (d) => d.department
      );

      // Add non-White total
      out = this.addNonWhiteTotal(out, deptTotals);

      // Add total number
      out = this.addTotalNumber(out, deptTotals);

      // Add percentages
      out = this.addPercentages(out, deptTotals);

      return out;
    },
    dataAdmin() {
      return this.chartData.filter(
        (d) =>
          (INDEPENDENTS.indexOf(d.department) === -1) |
          (d.department === "Philadelphia Census")
      );
    },
    dataIndependents() {
      return this.chartData.filter(
        (d) =>
          (INDEPENDENTS.indexOf(d.department) > -1) |
          (d.department === "Philadelphia Census")
      );
    },
    cellSize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        return 40;
      } else return 24;
    },
    marginLeft() {
      if (window.matchMedia("(min-width: 960px)").matches) {
        return 200;
      } else return 170;
    },
    marginTop() {
      if (window.matchMedia("(min-width: 960px)").matches) {
        return 160;
      } else return 125;
    },
    showAllRaces() {
      return this.raceBreakdownToggle === "All Races/Ethnicities";
    },
    sortBy() {
      let values = {
        "Number of Employees": "employees",
        "Percent White": "white",
        "Department Name": "department",
      };
      return values[this.sortByToggle];
    },
  },
  methods: {
    addCensusTotal(data) {
      for (const [race, value] of this.censusData.entries()) {
        data.push({
          department: "Philadelphia Census",
          race: race,
          pct: value,
        });
      }

      return data;
    },
    addTotalNumber(data, totals) {
      for (const [key, value] of totals.entries()) {
        if (key != "Philadelphia Census")
          data.push({ department: key, race: "Total Number", count: value });
      }

      return data;
    },
    addNonWhiteTotal(data, totals) {
      // Get White values
      let white = new Map(
        data
          .filter((d) => d.race === "White")
          .map((d) => [d.department, +d.count])
      );

      for (const [key, value] of totals.entries()) {
        if (key != "Philadelphia Census") {
          data.push({
            department: key,
            race: "Non-White",
            count: value - white.get(key),
          });
        }
      }

      return data;
    },
    addPercentages(data, totals) {
      return data.map((d) => {
        // Convert to float
        d["count"] = +d["count"];

        // Add percentages
        if (d.department != "Philadelphia Census")
          d["pct"] = d["count"] / totals.get(d["department"]);

        // Add relative percentages
        d["pct_relative"] = d["pct"] - this.censusData.get(d["race"]);
        return d;
      });
    },
    addCitywideTotal(data) {
      // Sum up the counts for each department in Mayoral admin
      let totals = rollup(
        data.filter((d) => INDEPENDENTS.indexOf(d.department) === -1),
        (v) => sum(v, (d) => +d.count),
        (d) => d.race
      );

      for (const [key, value] of totals.entries()) {
        data.push({ department: "All Departments", race: key, count: value });
      }
      return data;
    },
  },
};
</script>


<style scoped>
.heatmap-title {
  font-size: 1.7rem;
}
#heatmaps {
  margin-top: 3rem;
}
</style>


