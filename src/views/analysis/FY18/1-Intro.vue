<template>
  <div id="introduction" class="section">
    <p>
      While the majority of the City’s workforce is hired through the civil
      service system, approximately 4,600 employees, called exempt,
      non-represented or at-will employees, are not. The demographic makeup of
      these employees is important because it reflects the City's hiring
      practices, specifically its ability to hire diverse candidates. Senior
      leadership positions, such as department and cabinet heads, are also often
      part of the exempt workforce.
    </p>
    <p>
      This review visualizes the racial breakdown of Philadelphia's exempt
      workforce at the end of Fiscal Year 2018 (FY18). The data was compiled by
      the Controller's Office from the City’s legacy payroll system.<sup
        ><a href="#fn1" id="ref1">[1]</a></sup
      >
      Employees are shown in relation to the department from which they are
      paid. The data is accurate as of June 24, 2018.
    </p>
    <p>
      To evaluate the City's progress toward its diversity goals and the
      diversity of its leadership, the data below can be broken out into four
      important categories: all exempt employees, exempt employees hired in
      FY18,<sup><a href="#fn2" id="ref2">[2]</a></sup>
      exempt employees with salaries greater than $90,000, and the subset of new
      hires with salaries greater than $90,000. Data for these categories can be
      selected using the buttons below.
    </p>
    <p>
      The diversity data is presented as two separate heatmaps, one for all
      departments that fall under the Mayor's authority (left) and one for
      independently elected offices (right). Rows of the heatmap show results
      for a specific department while columns represent different races and
      ethnicities. The data is visualized relative to Philadelphia's overall
      population statistics according to 2017 census data. The color gray
      indicates that a particular race or ethnicity is represented at the same
      level as the city's census, while the colors red and blue indicate
      overrepresentation and underrepresentation, respectively.
    </p>

    <!-- Link -->
    <p class="font-italic mt-5">
      <i class="fas fa-long-arrow-alt-right fa-2x my-arrow mr-1"></i>
      <span
        >Explore the diversity of all City departments using the
        <router-link to="/explorer">Diversity Explorer</router-link>.</span
      >
    </p>
  </div>
</template>

<script>
export default { name: "Intro" };
</script>

<style>
.my-arrow {
  vertical-align: -0.6rem !important;
  color: #2176d2;
}
</style>

