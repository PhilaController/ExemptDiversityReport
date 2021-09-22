<template>
  <div data-vuetify>
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

        <router-view></router-view>
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
</style>
