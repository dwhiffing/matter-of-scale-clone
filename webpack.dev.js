var path = require("path");
var webpack = require("webpack");
var _ = require('lodash')

var webpackBaseConfig = require("./webpack.base.js");

module.exports = _.assign(webpackBaseConfig, {
  devtool: "eval",
  plugins: [
    // set env vars
    new webpack.DefinePlugin({
      __PRODUCTION__: false
    })
  ]
})
