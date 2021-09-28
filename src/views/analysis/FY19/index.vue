<template>
  <div id="analysis">
    <Intro />
    <KeyFindings />
    <MainChanges />
    <Footnotes />
  </div>
</template>

<script>
import Intro from "./1-Intro";
import KeyFindings from "./2-KeyFindings";
import MainChanges from "./3-MainChanges";
import Footnotes from "./4-Footnotes";

export default { components: { Intro, KeyFindings, MainChanges, Footnotes } };
</script>
