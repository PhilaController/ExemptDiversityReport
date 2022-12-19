<template>
  <div id="introduction" class="section">
    <p>
      The City of Philadelphia (City) employs about 4,700 people who are not
      hired through the civil service system, known as exempt employees. The
      demographics of this exempt workforce can help evaluate the City’s ability
      to hire diverse candidates and maintain an inclusive work environment. The
      exempt workforce is comprised of employees at all job levels, including
      those in senior leadership positions, such as department and cabinet
      heads.
    </p>

    <p>
      This review examines the racial breakdown of Philadelphia's exempt
      workforce at the end of fiscal year 2021 (FY21). It builds on previous
      reports<footnote-reference /> by the Controller’s Office that have
      examined the demographics of the exempt workforce since the end of FY18.
      The data for this year’s review was compiled from the City’s OnePhilly
      payroll system, and departments were asked to verify its accuracy before
      finalizing. Similar to previous reports, exempt employees are shown in
      relation to the department from which they are paid.<footnote-reference />
    </p>
    <p>
      To illustrate the City's progress toward its diversity goals and the
      diversity of its leadership, the data is broken out into four important
      categories: all exempt employees, new exempt hires in
      FY21,<footnote-reference /> exempt employees with salaries of at least
      $90,000 (referred to as “executive” positions), and the subset of new
      hires with salaries of at least $90,000. The diversity of the City’s
      exempt workforce is examined separately for City departments that fall
      under the Mayor’s authority and for independent offices.
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
import FootnoteReference from "@/components/FootnoteReference";

export default {
  name: "Intro",
  components: { FootnoteReference },
  data() {
    return { footnoteStart: 1 };
  },
};
</script>

<style>
.my-arrow {
  vertical-align: -0.6rem !important;
  color: #2176d2;
}
</style>
