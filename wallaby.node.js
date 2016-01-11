var babel = require('babel')

// This wallaby config runs the tests through node, same as via npm test
module.exports = function (wallaby) {
  return {
    testFramework: 'mocha',
    files: [
      'src/**/*.js*',
    ],
    tests: [
      'test/**/*Tests.js*'
    ],
    compilers: {
      '**/*.js*': wallaby.compilers.babel({babel: babel, stage: 0})
    },
    delays: {
      edit: 500,
      run: 150
    },
    env: {
      type: 'node',
      params: {
        env: 'NODE_PATH=$NODE_PATH:./src'
      }
    },
    bootstrap: function (wallaby) {
      require('../test/jsdom')
    }
  }
}
