<template>
  <div class="section" id="key-findings">
    <h2>Key Findings</h2>
    <hr class="titlebar" />

    <ul aria-labelledby="key-findings">
      <li>
        In FY21, diverse employees accounted for 47.3% of the exempt workforce
        while the city’s overall population is 67.0% diverse.<footnote-reference />
      </li>
      <li>
        Due to hiring freezes and attrition in FY21, the size of the exempt
        workforce decreased in FY21. There were 109 fewer exempt employees and
        181 fewer new hires in FY21 compared to FY20.
      </li>
      <li>
        The diversity of new exempt hires improved significantly in FY21. The
        demographics of new hires were largely in line with citywide census
        demographics, showing improvement over the last three fiscal years.
      </li>
      <li>
        While new executive hires continued to be less diverse than new hires
        overall, executive diversity has improved as compared to prior years.
      </li>
    </ul>
  </div>
</template>

<script>
import FootnoteReference from "@/components/FootnoteReference";

export default {
  name: "KeyFindings",
  components: { FootnoteReference },
  data() {
    return { footnoteStart: 4 };
  },
};
</script>
