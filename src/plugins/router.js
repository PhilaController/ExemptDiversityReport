import Vue from "vue";
import Router from "vue-router";
import Explorer from "@/views/explorer"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            // eslint-disable-next-line
            component: require("@/views/analysis/" + __REPORT_TAG__ + "/index.vue").default,
        },
        {
            path: "/explorer",
            name: "heatmap",
            component: Explorer
        },
    ],
});

