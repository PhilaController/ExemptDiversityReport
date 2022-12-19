<template>
  <div id="introduction" class="section">
    <p>
      While the majority of the City’s workforce is hired through the civil
      service system, approximately 4,600 employees are not. The demographics of
      this exempt workforce are a direct reflection of the City’s hiring
      practices and can help evaluate the City’s ability to hire diverse
      candidates and maintain an inclusive work environment. The exempt
      workforce is comprised of employees at all job levels, including those in
      senior leadership positions, such as department and cabinet heads.
    </p>

    <p>
      This review examines the racial breakdown of Philadelphia's exempt
      workforce at the end of fiscal year 2019 (FY19). It builds on the
      Controller’s Office
      <a
        href="https://controller.phila.gov/philadelphia-audits/fy18-exempt-employee-diversity/"
        target="blank_"
        >diversity review from last year</a
      >, which examined the demographics of the exempt workforce at the end of
      FY18. The data for this year’s review was compiled by the City
      Controller’s Office from the City’s new payroll system.<footnote-reference />
      Similar to last year’s report, exempt employees are shown in relation to
      the department from which they are paid.<footnote-reference />
    </p>

    <p>
      To evaluate the City's progress toward its diversity goals and the
      diversity of its leadership, the data is broken out into four important
      categories: all exempt employees, exempt employees hired in
      FY19,<footnote-reference /> exempt employees with salaries greater than
      $90,000, and the subset of new hires with salaries greater than $90,000.
      Data is examined separately for City departments that fall under the
      Mayor’s authority and for independently elected offices. In FY19,
      departments in the Mayoral administration employed 1,584 exempt workers,
      with about 32% earning more than $90,000 annually. There were 2,977 exempt
      employees in independent offices, concentrated primarily in the First
      Judicial District (2,216 employees) and the District Attorney’s Office
      (471 employees).
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
