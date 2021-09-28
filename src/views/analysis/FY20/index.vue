<template>
  <div id="analysis">
    <Intro />
    <KeyFindings />
    <DetailedAnalysis />
    <Footnotes />
  </div>
</template>

<script>
import Intro from "./1-Intro";
import KeyFindings from "./2-KeyFindings";
import DetailedAnalysis from "./3-DetailedAnalysis";
import Footnotes from "./4-Footnotes";

export default {
  components: { Intro, KeyFindings, DetailedAnalysis, Footnotes },
};
</script>
