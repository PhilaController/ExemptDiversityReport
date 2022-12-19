<template>
  <div :id="`heatmap-wrapper-${kind}`" class="d-flex justify-content-center">
    <svg :width="w" :height="h" :aria-label="ariaLabel">
      <g :id="`heatmap-canvas-${kind}`" :transform="transformProperty" />
      <!-- a11y table -->
      <a11yTable
        v-if="data.length > 0"
        :data="data"
        :columns="races"
        :rows="rowOrder"
        :caption="caption"
      />
    </svg>
    <Tooltip
      v-show="showTooltip"
      :selectedData="selectedData"
      :data="data"
      :races="races"
      :censusData="censusData"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import Tooltip from "./Tooltip.vue";
import $ from "jquery";
import a11yTable from "@/components/a11yTable";

export default {
  components: { Tooltip, a11yTable },
  name: "heatmap",
  props: [
    "cellSize",
    "kind",
    "marginLeft",
    "marginTop",
    "title",
    "data",
    "censusData",
    "showAllRaces",
    "sortBy",
  ],
  data() {
    return {
      margin: {
        top: this.marginTop,
        right: 50,
        bottom: 30,
        left: this.marginLeft,
      },
      selectedData: null,
      showTooltip: false,
      colorFactor: 1.1,
      ariaLabel:
        "A two-dimensional grid of rectangles, with departments along the y-axis, " +
        "race/ethnicity along the x-axis, and rectangles colored according to diversity percentage.",
    };
  },
  watch: {
    sortBy() {
      this.update();
    },
    showAllRaces() {
      this.updateColumns();
    },
  },
  mounted() {
    this.$nextTick(() => {
      return this.initialize();
    });
  },
  computed: {
    caption() {
      return `Tabular representation of the SVG graphic, showing diversity statistics by department for ${this.title}`;
    },
    yLabelSize() {
      return window.matchMedia("(min-width: 768px)").matches ? "1em" : "0.8em";
    },
    xLabelSize() {
      return window.matchMedia("(min-width: 768px)").matches ? "1em" : "0.8em";
    },
    rowOrder() {
      return this.sortHeatMap(this.sortBy);
    },
    filteredData() {
      return this.data.filter((el) => this.races.indexOf(el.race) !== -1);
    },
    transformProperty() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    },
    w() {
      return this.width + this.margin.left + this.margin.right;
    },
    width() {
      return this.races.length * this.cellSize;
    },
    h() {
      return this.height + this.margin.top + this.margin.bottom;
    },
    height() {
      return this.rowOrder.length * this.cellSize;
    },

    races() {
      if (this.showAllRaces) {
        return [
          "White",
          "Black/African American",
          "Hispanic",
          "Asian",
          "American Indian",
          "Other",
          "Total Number",
        ];
      } else return ["White", "Non-White", "Total Number"];
    },
    raceAliases() {
      let aliases = {
        "Black/African American": "Black or Afr. Am.",
        "Non-White": "Diverse",
      };
      let t = [];
      for (let i = 0; i < this.races.length; i++) {
        if (aliases[this.races[i]]) t.push(aliases[this.races[i]]);
        else t.push(this.races[i]);
      }
      return t;
    },
    departments() {
      return d3.map(this.data, (d) => d.department).keys();
    },
  },
  methods: {
    initialize() {
      let vueComponent = this;
      let svg = d3.select(`#heatmap-canvas-${this.kind}`);
      let scale = this.getScales();

      // the x axis
      const gx = svg
        .append("g")
        .style("font-size", this.xLabelSize)
        .attr("class", "gx")
        .call(
          d3
            .axisTop(scale.x)
            .tickSize(0)
            .tickFormat((d) => this.raceAliases[d])
        );

      // remove the domain
      gx.select(".domain").remove();

      // rotate ticks for x axis
      gx.selectAll("text")
        .style("text-anchor", "start")
        .attr("transform", "rotate(-70)")
        .attr("dy", "0.5em")
        .attr("dx", "0.5em");

      // the y axis
      const gy = svg
        .append("g")
        .style("font-size", this.yLabelSize)
        .style("fill", "black")
        .attr("class", "gy")
        .call(
          d3
            .axisLeft(scale.y)
            .tickSize(0)
            .tickFormat((d) => this.rowOrder[d])
        );

      // remove the domain
      gy.select(".domain").remove();

      // make Philadelphia Census and All Department bold
      gy.selectAll("text").style("font-weight", function(d) {
        let depts = ["Philadelphia Census", "All Departments"];
        let bold = depts.indexOf(vueComponent.rowOrder[d]) !== -1;
        return bold ? "bold" : "normal";
      });

      // add the data
      const rects = svg
        .append("g")
        .attr("class", "heatmap-rects")
        .selectAll()
        .data(this.filteredData, function(d) {
          return `${d.department} : ${d.race} : ${vueComponent.showAllRaces}`;
        })
        .enter();

      // add rectangles
      rects
        .append("rect")
        .attr("x", function(d) {
          return scale.x(vueComponent.races.indexOf(d.race));
        })
        .attr("y", function(d) {
          return scale.y(vueComponent.rowOrder.indexOf(d.department));
        })
        .attr("stroke", "#fff")
        .attr("width", scale.x.bandwidth())
        .attr("height", scale.y.bandwidth())
        .attr("department", (d) => d.department)
        .attr("race", (d) => d.race)
        .style("fill", (d) => vueComponent.getFillColor(d))
        .style("stroke-width", function(d) {
          return d.race !== "Total Number" ? 0.5 : 0;
        })
        .on("mouseover", this.mouseover)
        .on("mousemove", this.mousemove)
        .on("mouseleave", this.mouseleave);

      // add the total number
      rects
        .append("text")
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "central")
        .attr("font-size", this.yLabelSize)
        .attr("class", "total-number")
        .attr("x", function(d) {
          return scale.x(vueComponent.races.indexOf(d.race));
        })
        .attr("y", function(d) {
          return (
            scale.y(vueComponent.rowOrder.indexOf(d.department)) +
            0.5 * scale.y.bandwidth()
          );
        })
        .text(function(d) {
          return d.race === "Total Number" ? d3.format(",.0f")(+d.count) : "";
        })
        .attr("class", "total-number-text");
    },
    getFillColor(d) {
      let value = 0;
      const getColor = this.getColor();

      if (d.race === "Total Number") return "#fff";
      else if (d.department !== "Philadelphia Census") value = d.pct_relative;
      return getColor(value);
    },
    getColor() {
      let limit = this.colorFactor * 0.5;
      return d3
        .scaleSequential()
        .interpolator(d3.interpolateRdBu)
        .domain([limit, -limit]);
    },
    sortHeatMap(sortBy) {
      let f = this.data.filter(
        (el) =>
          (el.department !== "Philadelphia Census") &
          (el.department !== "All Departments")
      );
      let d;
      if (sortBy === "white") {
        d = f
          .filter((el) => el.race === "White")
          .sort(function(a, b) {
            return d3.descending(a.pct, b.pct);
          });
      } else if (sortBy === "department") {
        d = f
          .filter((el) => el.race === "White") // select only one column
          .sort(function(a, b) {
            return d3.ascending(a.department, b.department);
          });
      } else if (sortBy === "employees") {
        d = f
          .filter((el) => el.race === "Total Number")
          .sort(function(a, b) {
            return d3.descending(+a.count, +b.count);
          });
      }

      let first = ["Philadelphia Census"];
      if (this.data.map((a) => a.department).indexOf("All Departments") != -1) {
        first.push("All Departments");
      }
      let t = first.concat(d.map((a) => a.department));
      return t;
    },
    // eslint-disable-next-line
    mouseover(event, d) {
      // set the selected data
      this.selectedData = d;

      // show tooltip
      this.showTooltip = true;

      // outline selected row
      $(
        `#heatmap-wrapper-${this.kind} rect[department="${d.department}"][race!="Total Number"]`
      ).css({
        "stroke-width": 1,
        stroke: "black",
      });
    },
    mousemove(event, d) {
      // container offset
      let o = $(`#heatmap-wrapper-${this.kind}`).offset();

      // get width and height of tooltip div
      let t = $(`#heatmap-wrapper-${this.kind} .my-tooltip`);
      let w = t.width();
      let h = t.height();

      // Which column did we click?
      let j = this.races.indexOf(d.race);

      // Figure out horizontal alignment
      let factor = 0.5; // align to center
      if (this.$vuetify.breakpoint.mobile) {
        factor = 0.8 + j * 0.04; // align to right
      }

      // show tooltip above
      let buffer = 75;
      if (event.clientY + h + buffer > window.innerHeight) {
        $(`#heatmap-wrapper-${this.kind} .my-tooltip`).css({
          left: event.pageX - o.left - factor * w + "px",
          top: event.pageY - o.top - h - 40 + "px",
        });
      } else {
        // show tooltip below
        $(`#heatmap-wrapper-${this.kind} .my-tooltip`).css({
          left: event.pageX - o.left - factor * w + "px",
          top: event.pageY - o.top + 40 + "px",
        });
      }
    },
    // eslint-disable-next-line
    mouseleave(event, d) {
      // hide tooltip
      this.showTooltip = false;

      // reset the rect stroke
      $(`rect[department="${d.department}"][race!="Total Number"]`).css({
        "stroke-width": 0.5,
        stroke: "#fff",
      });
    },
    getScales() {
      let x = d3
        .scaleBand()
        .range([0, this.width])
        .domain(d3.range(this.raceAliases.length))
        .padding(0.05);
      let y = d3
        .scaleBand()
        .domain(d3.range(this.rowOrder.length))
        .range([0, this.height])
        .padding(0.05);
      return { x, y };
    },
    updateColumns() {
      // save this for late
      let vueComponent = this;

      // the svg element
      let svg = d3.select(`#heatmap-canvas-${this.kind}`);

      // the transition
      const t = svg.transition().duration(750);

      // get the scales
      let scale = this.getScales();

      // update x scales
      scale.x.domain(d3.range(this.raceAliases.length));
      let gx = svg.select(".gx");
      gx.call(
        d3
          .axisTop(scale.x)
          .tickSize(0)
          .tickFormat((d) => this.raceAliases[d])
      );
      gx.select(".domain").remove();

      // rotate ticks for x axis
      gx.selectAll("text")
        .style("text-anchor", "start")
        .attr("transform", "rotate(-70)")
        .attr("dy", "0.5em")
        .attr("dx", "0.5em");

      svg.selectAll("rect").remove();
      svg.selectAll(".total-number-text").remove();
      svg.selectAll(".svg-title").remove();

      const rects = svg.selectAll("rect").data(this.filteredData, function(d) {
        return `${vueComponent.showAllRaces}_${d.department}_${d.race}`;
      });

      rects
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return scale.x(vueComponent.races.indexOf(d.race));
        })
        .attr("y", function(d) {
          return scale.y(vueComponent.rowOrder.indexOf(d.department));
        })
        .attr("stroke", "#fff")
        .attr("width", scale.x.bandwidth())
        .attr("height", scale.y.bandwidth())
        .attr("department", (d) => d.department)
        .attr("race", (d) => d.race)
        .style("fill-opacity", 1e-6)
        .style("fill", (d) => vueComponent.getFillColor(d))
        .style("stroke-width", function(d) {
          return d.race !== "Total Number" ? 0.5 : 0;
        })
        .on("mouseover", this.mouseover)
        .on("mousemove", this.mousemove)
        .on("mouseleave", this.mouseleave)
        .transition(t)
        .style("fill-opacity", 1);

      rects
        .enter()
        .append("text")
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "central")
        .attr("font-size", this.yLabelSize)
        .attr("class", "total-number")
        .style("opacity", 1e-6)
        .attr("x", function(d) {
          return scale.x(vueComponent.races.indexOf(d.race));
        })
        .attr("y", function(d) {
          return (
            scale.y(vueComponent.rowOrder.indexOf(d.department)) +
            0.5 * scale.y.bandwidth()
          );
        })
        .text(function(d) {
          return d.race === "Total Number" ? d3.format(",.0f")(+d.count) : "";
        })
        .attr("class", "total-number-text")
        .transition(t)
        .style("opacity", 1);
    },
    update() {
      let vueComponent = this;
      let svg = d3.select(`#heatmap-canvas-${this.kind}`);
      const t = svg.transition().duration(1500);

      let scale = this.getScales();

      svg
        .selectAll("rect")
        .transition(t)
        .attr("y", function(d) {
          return scale.y(vueComponent.rowOrder.indexOf(d.department));
        });

      let gy = svg.select(".gy");
      gy.transition(t)
        .selectAll(".tick")
        .attr("transform", function() {
          let oldLabel = d3.select(this).text();
          let j = vueComponent.rowOrder.indexOf(oldLabel);
          let y = scale.y(j) + 0.5 * scale.y.bandwidth();
          return `translate(0, ${y})`;
        });

      svg
        .transition(t)
        .selectAll(".total-number-text")
        .attr("y", function(d) {
          let j = vueComponent.rowOrder.indexOf(d.department);
          return scale.y(j) + 0.5 * scale.y.bandwidth();
        });
    },
  },
};
</script>

<style>
#heatmap-wrapper-indep {
  margin-bottom: 200px;
}
@media screen and (min-width: 1265px) {
  #heatmap-wrapper-admin {
    margin-bottom: 200px;
  }
}
</style>
