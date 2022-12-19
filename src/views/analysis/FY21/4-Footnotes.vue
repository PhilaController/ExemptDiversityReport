<template>
  <div class="section" id="footnotes">
    <h2 class="section-title mt-3">Footnotes</h2>
    <hr class="titlebar" />

    <div class="mt-2">
      <footnote
        text="See the <a href='https://controller.phila.gov/philadelphia-audits/fy18-exempt-employee-diversity/#/' target='blank_'>FY18 Exempt Diversity Review <i class='fas fa-external-link-alt'></i></a>, <a href='https://controller.phila.gov/philadelphia-audits/fy19-exempt-employee-diversity/#/' target='blank_'>FY19 Exempt Diversity Review <i class='fas fa-external-link-alt'></i></a>, and <a href='https://controller.phila.gov/philadelphia-audits/fy20-exempt-employee-diversity/#/' target='blank_'>FY20 Exempt Diversity Review <i class='fas fa-external-link-alt'></i></a>."
      />

      <footnote
        text="Note that the department that hires an employee is not necessarily responsible for paying that employee. As hiring information has been unavailable in past years, employees are associated with the department that pays them to allow for year-over-year comparisons and ensure accurate data quality."
      />

      <footnote
        text="Data for new exempt hires includes employees new to the City of Philadelphia as well as employees who have moved between City departments."
      />

      <footnote
        text="Throughout the report, the diversity of the exempt workforce is compared to the demographics of the citywide population, using <a href='https://data.census.gov/table?q=B03002&g=0500000US42101&tid=ACSDT1Y2021.B03002' target='blank_'>2021 Census data <i class='fas fa-external-link-alt'></i></a> to measure the diversity of the city’s population."
      />

      <footnote
        text="This definition of executive positions is consistent with the City’s annual workforce studies, available <a href='https://www.phila.gov/documents/philadelphia-workforce-profile-report/' target='blank_'>here <i class='fas fa-external-link-alt'></i></a>."
      />

      <footnote
        text="See the <a href='https://controller.phila.gov/wp-content/uploads/2021/10/Exempt-Hiring-Playbook.pdf' target='blank_'>“Exempt Hiring Guide for Building a Talented, Diverse Workforce” <i class='fas fa-external-link-alt'></i></a>."
      />
    </div>
  </div>
</template>

<script>
import Footnote from "@/components/Footnote";

export default { name: "Footnotes", components: { Footnote } };
</script>

<style>
#footnotes {
  margin-top: 100px;
}

div[id^="footnote-"] {
  margin-top: 0.5rem;
}
</style>
