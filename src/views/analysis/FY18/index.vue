<template>
  <div id="analysis">
    <Intro />
    <KeyFindings />
    <Footnotes />
  </div>
</template>

<script>
import Intro from "./1-Intro";
import KeyFindings from "./2-KeyFindings";
import Footnotes from "./3-Footnotes";

export default { components: { Intro, KeyFindings, Footnotes } };
</script>
