<template>
  <v-app>
    <v-main>
      <diversity-report />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DiversityReportApp",
  components: {
    // eslint-disable-next-line
    "diversity-report": require("@/reports/" + __REPORT_TAG__ + "/index.vue")
      .default,
  },
};
</script>

<style>
.header-title {
  font-size: 1.7rem;
  font-family: inherit;
  font-weight: 500;
  margin-right: 1rem;
}
.header-subtitle {
  font-style: italic;
  font-size: 1rem;
}
.card-footer {
  font-size: 0.9rem;
}
.section:nth-child(n + 2) {
  margin-top: 2.5rem;
}
</style>