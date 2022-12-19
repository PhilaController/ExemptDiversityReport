<template>
  <div class="section" id="footnotes">
    <h2 class="section-title mt-3">Footnotes</h2>
    <hr class="titlebar" />

    <div class="mt-2">
      <footnote
        text="Note that some departments disagreed with diversity data from the City’s
        payroll system. In these cases, the Controller’s Office reconciled any
        differences between the payroll data and department-provided data, if
        provided."
      />

      <footnote
        text="Note that in some cases, most notably in the Law Department, departments
        will be responsible for paying employees who are hired by other
        departments."
      />

      <footnote
        text="Data for new exempt hires includes employees new to the City of
        Philadelphia as well as employees who have moved between City
        departments."
      />

      <footnote text="Source: 2018 American Community Survey" />

      <footnote
        text="Note that a number of new exempt employees are hired by the Law
        Department but paid through other departments. For example, the Law
        Department was responsible for paying for 23 new exempt hires in FY19
        (30% diverse), but the department hired 39 exempt employees, of which
        41% were diverse."
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
