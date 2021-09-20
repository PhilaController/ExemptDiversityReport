const webpack = require("webpack");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    extract: false
  },
  configureWebpack: (env) => {
    const fiscalYear = process.env.VUE_APP_FISCAL_YEAR;
    let tag = `FY${fiscalYear.toString().slice(2)}`

    return {
      externals: {
        jquery: "jQuery",
        $: "jQuery"
      },
      entry: {
        main: './src/main.js',
      },
      output: {
        filename: `exempt-diversity-report-${tag}.[name].[hash:7].js`,
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
          __REPORT_TAG__: JSON.stringify(tag),
        }),
      ],
      optimization: { splitChunks: false }
    }
  }
}
