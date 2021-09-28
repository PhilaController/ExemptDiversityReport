<template>
  <div id="diversity-report-app" data-vuetify>
    <v-app>
      <v-main>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#2176d2"
          centered
          class="tab-bar"
        >
          <v-tab key="analysis" to="/" :ripple="false"> Analysis </v-tab>
          <v-tab key="explorer" to="/explorer" :ripple="false">
            Diversity Explorer
          </v-tab>
        </v-tabs>

        <!-- Router view -->
        <router-view :key="$route.path" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "DiversityReportApp",
  data() {
    return { tab: null };
  },
};
</script>

<style>
.section:nth-child(n + 2) {
  margin-top: 2.5rem;
}
.tab-bar {
  margin-bottom: 50px;
}
#diversity-report-app {
  overflow-x: hidden !important;
}

h2,
h3 {
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
}

.aligncenter {
  margin: 2em auto !important;
  padding: 6px !important;
}
</style>
