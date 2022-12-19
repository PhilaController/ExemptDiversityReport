import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import router from "@/plugins/router";
import App from "@/App.vue";
import $ from "jquery";
import { descending } from "d3-array";
import { getDownloadURL, getReportTag } from "@/utils";

// Vue scroll to
let VueScrollTo = require("vue-scrollto");
let pad = 10;
let offset = -($("#site-navigation").outerHeight() + pad);
Vue.use(VueScrollTo, { offset: offset });

Vue.config.productionTip = false;

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(`<div id="app"></div>`);

function add_help_message() {
  if ($(".help-message").length > 0) return;

  let helpMessage = `<p class='help-message'>
  Comments or feedback? Please contact
  <a href="mailto:controller@phila.gov">controller@phila.gov</a>.
  </p>`;
  $(".back-link").after(helpMessage);
}

async function add_archived_reports_button() {
  // Create a dropdown element and button
  let dropdown = $(`<div class="dropdown mt-2"></div>`);
  let button = $(`<button class="btn btn-primary btn-block dropdown-toggle" 
                    type="button" 
                    id="otherReportsButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false">Other Diversity Reports</button>`);
  let dropdownMenu = $(
    `<div class="dropdown-menu w-100" 
          aria-labelledby="otherReportsButton"
          style="max-height: 300px; overflow-y: auto"></div>`
  );

  // Load the data
  let response = await fetch(
    "https://raw.githubusercontent.com/PhiladelphiaController/ExemptDiversityReport/main/src/data/diversity-reports.json"
  );
  let data = await response.json();

  // Sort the data in descending order
  data = data.sort((a, b) => descending(a.label, b.label));

  // This report
  let thisReport = __REPORT_TAG__; // eslint-disable-line

  // Add each URL
  let baseURL = "https://controller.phila.gov/philadelphia-audits/";
  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    // Skip the current report
    if (item.label === thisReport) continue;

    // Otherwise, add the dropdown item
    dropdownMenu.append(
      `<a class="dropdown-item" style="color: #212529;" href="${baseURL}/${item.slug}">${item.label}</a>`
    );
  }
  dropdown.append(button);
  dropdown.append(dropdownMenu);

  // Don't add more than once
  if ($("#otherReportsButton").length > 0) return;

  // Add the dropdown button
  $(".entry-header .btn")
    .last()
    .after(dropdown);
}

function add_data_button() {
  if ($("#dataDownloadButton").length > 0) return;

  // add a new button
  let thisReport = getReportTag();
  let url = getDownloadURL(`exempt-diversity-data-${thisReport}`);
  let btn = `<a id="dataDownloadButton" href="${url}" class="btn btn-primary btn-block btn-block">
            <i class="fas fa-download"></i>
            Download Data
        </a>`;

  // add download data button and remove the report button
  $(".entry-header .btn").after(btn);
}

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

// When document is loaded
$(document).ready(function() {
  // Add the buttons
  add_data_button();
  add_archived_reports_button();

  // add a help message
  add_help_message();

  // Turn off FA
  window.FontAwesome.config.observeMutations = false;
  window.FontAwesome.config.searchPseudoElements = false;
});
