var babel = require('babel')
var path = require("path")
var wallabyWebpack = require('wallaby-webpack')

// This wallaby config runs through webpack/phantom for proper browser testing
module.exports = function(wallaby) {
  return {
    testFramework: 'mocha',
    files: [{pattern: 'src/**/*.js*', load: false}],
    tests: [{pattern: 'test/**/*Tests.js*', load: false, instrument: false}],
    compilers: {
      '**/*.js*': wallaby.compilers.babel({babel: babel, stage: 0, optional: ['runtime']})
    },
    env: {
      type: 'browser',
      runner: './node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs'
    },
    postprocessor: wallabyWebpack({
      resolve: {
        root: path.join(wallaby.projectCacheDir, 'src'),
        extensions: ['', '.js', '.jsx']
      }
    }),
    bootstrap: function() {
      window.__moduleBundler.loadTests()
    }
  }
}
