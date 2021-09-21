<template>
  <div>
    <v-row no-gutters>
      <!-- Chart guide text -->
      <v-col class="chart-guide-text mb-2" cols="12" sm="12" md="8" lg="8">
        <p>
          The data is visualized relative to Philadelphia's overall population
          statistics according to the latest Census data. The color gray
          indicates that a particular race or ethnicity is represented at the
          same level as the city's census, while the colors red and blue
          indicate overrepresentation and underrepresentation, respectively.
        </p>

        <p>
          Hover over (click on mobile) individual cells to see diversity numbers
          for specific departments.
        </p>
      </v-col>
      <!-- Chart guide legend -->
      <v-col class="chart-guide-legend" cols="12" sm="12" md="4" lg="4">
        <svg :width="width" :height="height">
          <g id="viewer-guide-canvas" :transform="transformProperty"></g>
        </svg>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "DataVizGuide",
  data() {
    return {
      cellSize: 30,
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      labelFontSize: "1.2rem",
      width: 400,
    };
  },
  computed: {
    data() {
      return [
        { id: 0, value: 0.1, label: "", offset: null },
        { id: 1, value: 0.3, label: "Overrepresented vs. Census", offset: 0 },
        {
          id: 2,
          value: 0.5,
          label: "Parity with the Census",
          offset: 0.5 * this.cellSize,
        },
        { id: 3, value: 0.7, label: "", offset: null },
        { id: 4, value: 0.9, label: "Underrepresented vs. Census", offset: 0 },
      ];
    },
    xRange() {
      let t = [];
      for (let i = 0; i < this.data.length; i++) t.push(this.cellSize * i);
      return t;
    },
    transformProperty() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    height() {
      return (
        this.margin.top + this.margin.bottom + this.data.length * this.cellSize
      );
    },
  },
  mounted() {
    let vueComponent = this;
    let svg = d3.select("#viewer-guide-canvas");
    let scale = this.getScales();

    const getColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateRdBu)
      .domain([0, 1]);

    // add the data
    const rects = svg
      .append("g")
      .attr("class", "guide-rects")
      .selectAll()
      .data(this.data)
      .enter();

    // add rectangles
    rects
      .append("rect")
      .attr("x", () => scale.x(0))
      .attr("y", (d) => scale.y(d.id))
      .attr("stroke", "#000")
      .attr("width", this.cellSize + "px")
      .attr("height", this.cellSize + "px")
      .style("fill", function (d) {
        return getColor(d.value);
      })
      .style("stroke-width", 1.5);

    // add labels
    rects
      .append("text")
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
      .attr("font-size", this.labelFontSize)
      .attr("x", () => vueComponent.cellSize + 10 + "px")
      .attr("y", function (d, i) {
        if (d.offset !== null) {
          return vueComponent.cellSize * i + d.offset + "px";
        } else return "0px";
      })
      .text(function (d) {
        return d.label !== null ? d.label : "";
      })
      .attr("class", "guide-label");
  },
  methods: {
    getScales() {
      let x = d3.scaleOrdinal().range([5, this.width]).domain([0, 1]);
      let y = d3
        .scaleOrdinal()
        .domain(d3.range(this.data.length))
        .range(this.xRange);
      return { x, y };
    },
  },
};
</script>


