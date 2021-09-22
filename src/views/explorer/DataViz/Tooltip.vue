<template>
  <div class="my-tooltip">
    <!-- Title -->
    <div class="tooltip-title">{{ title }}</div>

    <!-- Table -->
    <table class="w-100">
      <!-- Header -->
      <thead>
        <tr class="tooltip-line">
          <th></th>
          <th v-if="!censusSelected">#</th>
          <th>%</th>
        </tr>
      </thead>
      <!-- Body -->
      <tbody>
        <template v-if="censusSelected">
          <tr
            class="tooltip-line"
            v-for="race in races"
            :key="`census-${race}`"
          >
            <template v-if="race !== 'Total Number'">
              <td class="line-header">
                {{ race == "Non-White" ? "Diverse" : race }}
              </td>
              <td>{{ formatter(100 * censusData.get(race)) }}</td>
            </template>
          </tr>
        </template>
        <template v-else>
          <tr
            class="tooltip-line"
            v-for="item in rowData"
            :key="`${item.department}-${item.race}`"
          >
            <template v-if="item.race !== 'Total Number'">
              <td class="line-header">{{ getRaceText(item.race) }}</td>
              <td>{{ item.count }}</td>
              <td>{{ formatter(100 * item.pct) }}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "tooltip",
  props: ["selectedData", "data", "censusData", "races", "tip"],
  data() {
    return {
      aliases: {
        MDO: "Managing Director's Office",
        OIT: "Office of Innovation and Technology",
        DHS: "Department of Human Services",
        CAO: "Office of the Chief Administrative Officer",
        "L&I": "Licenses & Inspections",
        DBHIDS: "Dept. of Behavioral Health & Intellectual Disability Services",
        CEO: "Mayor's Office of Community Empowerment and Opportunity",
        "City Rep": "Office of the City Representative",
        BRT: "Board of Revision of Taxes",
        Fleet: "Fleet Management",
        Treasurer: "Office of the City Treasurer",
        "Human Relations": "Commission on Human Relations",
        "Office of Education": "Mayor's Office of Education",
        Sustainability: "Office of Sustainability",
        Prisons: "Philadelphia Prisons",
        "Property Assessment": "Office of Property Assessment",
        "Homeless Services": "Office of Homeless Services",
        Water: "Philadelphia Water Department",
        Streets: "Streets Department",
        "Public Health": "Department of Public Health",
        Aviation: "Division of Aviation",
        "Labor Relations": "Mayor's Office of Labor Relations",
        "Arts & Culture": "Arts, Culture, & Creative Economy",
      },
    };
  },
  computed: {
    censusSelected() {
      if (this.selectedData === null) return false;
      else return this.selectedData.department === "Philadelphia Census";
    },
    title() {
      if (this.selectedData === null) return "";
      let t = this.selectedData.department;
      if (this.aliases[t]) t = this.aliases[t];
      return t;
    },
    rowData() {
      if (this.selectedData === null) return [];
      let d,
        t = [];
      for (let i = 0; i < this.races.length; i++) {
        d = this.data.filter(
          (x) =>
            (x.department === this.selectedData.department) &
            (x.race === this.races[i])
        );
        t.push(d[0]);
      }
      return t;
    },
  },
  methods: {
    formatter(d) {
      return d3.format(".1f")(d) + "%";
    },
    getRaceText(t) {
      if (t == "Non-White") return "Diverse";
      return t;
    },
  },
};
</script>


<style scoped>
td {
  padding: 0 7px 0 7px;
}

.tooltip-line {
  border-bottom: 1px solid #f0f0f0;
}

.line-header {
  text-align: left;
}

.my-tooltip {
  position: absolute;
  text-align: center;
  padding: 10px;
  font: 1rem sans-serif;
  background: #424242;
  border-radius: 8px;
  pointer-events: none;
  border: 1px solid #cdcdcd;
  opacity: 1;
  display: block;
  width: 250px;
  color: #eeeeee;
  z-index: 9999;
}

.tooltip-title {
  margin-bottom: 5px;
  border-bottom: 1px solid #cdcdcd;
  text-align: center;
  padding-bottom: 5px;
}
</style>