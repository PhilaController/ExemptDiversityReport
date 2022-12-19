<template>
  <div class="section" id="footnotes">
    <h2 class="section-title mt-3">Footnotes</h2>
    <hr class="titlebar" />

    <div class="mt-2">
      <footnote
        text='See the
        <a
          href="https://controller.phila.gov/philadelphia-audits/fy18-exempt-employee-diversity/"
          target="_blank"
          ><span>FY18 Exempt Diversity Review</span>
          <i class="ml-1 fas fa-external-link-alt"></i
        ></a>
        and
        <a
          href="https://controller.phila.gov/philadelphia-audits/fy19-exempt-employee-diversity/"
          target="_blank"
          ><span>FY19 Exempt Diversity Review</span>
          <i class="ml-1 fas fa-external-link-alt"></i></a
        >.'
      />

      <footnote
        text="Note that the department that hires an employee is not necessarily
        responsible for paying that employee. As hiring information has been
        unavailable in past years, employees are associated with the department
        that pays them to allow for year-over-year comparisons and ensure
        accurate data quality."
      />

      <footnote
        text="Data for new exempt hires includes employees new to the City of
        Philadelphia as well as employees who have moved between City
        departments."
      />

      <footnote
        text='Source:
        <a
          href="https://data.census.gov/cedsci/table?q=race%20ethnicity&g=0500000US42101&tid=DECENNIALPL2020.P2"
          target="_blank"
          ><span>2020 Decennial Census Redistricting data</span>
          <i class="ml-1 fas fa-external-link-alt"></i></a
        >.'
      />

      <footnote
        text='See the
        <a
          href="https://controller.phila.gov/wp-content/uploads/2021/10/Exempt-Hiring-Playbook.pdf"
          target="_blank"
          ><span
            >“Exempt Hiring Guide for Building a Talented, Diverse
            Workforce.”</span
          ><i class="ml-1 fas fa-external-link-alt"></i
        ></a>'
      />

      <footnote
        text="Follow-up questions were directed to the department responsible for the
        hiring process for new hires in FY20. This department is not necessarily
        the same as the department that is responsible for paying the employee.
        By using hiring department information, the Controller’s Office is able
        to more closely examine the City’s hiring process for exempt employees."
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
