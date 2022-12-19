<template>
  <div class="section" id="footnotes">
    <h2 class="section-title mt-3">Footnotes</h2>
    <hr class="titlebar" />

    <div class="mt-2">
      <footnote
        text="Diversity data for the Office of the City Commissioners was listed
        inaccurately in the City’s payroll system, and the Controller’s Office
        corrected this error when compiling the data."
      />

      <footnote
        text="Data for new exempt hires includes employees new to the City of
        Philadelphia as well as employees who have moved between City
        departments."
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
