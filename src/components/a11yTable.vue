<template>
  <table class="screen-reader-text">
    <caption>
      {{
        caption
      }}
    </caption>
    <!-- Header -->
    <thead>
      <tr>
        <th
          v-for="(column, columnIndex) in columns"
          :key="`column-header-${columnIndex}`"
          scope="col"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <!-- Body -->
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="`row-header-${rowIndex}`">
        <th scope="row">{{ row }}</th>
        <td
          v-for="(column, columnIndex) in columns"
          :key="`column-value-${columnIndex}`"
        >
          {{ getTableCell(row, column) }}
          <!-- {{ formatFunction(tableData.get(`${row} ${column}`)[1]) }} -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { format } from "d3-format";

export default {
  name: "a11yTable",
  props: ["caption", "data", "columns", "rows"],
  data() {
    return { formatFunction: format(".1%") };
  },
  computed: {
    tableData() {
      return new Map(
        this.data.map((row) => [
          `${row.department} ${row.race}`,
          [row.count, row.pct],
        ])
      );
    },
  },
  methods: {
    getTableCell(row, column) {
      let value = this.tableData.get(`${row} ${column}`);
      if (value === undefined) return "";
      if (row == "Philadelphia Census") return this.formatFunction(value[1]);
      else return `${value[0]} (${this.formatFunction(value[1])})`;
    },
  },
};
</script>
