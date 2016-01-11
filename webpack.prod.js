var webpack = require("webpack");
var _ = require('lodash')
var webpackBaseConfig = require("./webpack.base.js");
var path = require('path')

module.exports = _.assign(webpackBaseConfig, {
  output: {
    filename: "[hash]-[name].min.js"
  },

  plugins: [
    // prioritize order of dependencies
    new webpack.optimize.OccurenceOrderPlugin(true),

    // split dependencies into extra files based on entry point
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendors"], minChunks: Infinity
    }),

    // minify options
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),

    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(process.env.npm_package_config_junto_path, "hash"),
          stats.hash)
      });
    },

    // set env vars
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __PRODUCTION__: true
    })

  ]
})
