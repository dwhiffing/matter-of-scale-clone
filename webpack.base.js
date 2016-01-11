var path = require("path");

module.exports = {
  entry: {
    app: './src/index.js',
    vendors: [
      'bluebird',
      'classnames',
      'lodash',
      'react',
      'react-dom',
      'react-router',
      'redux',
      'redux-actions',
      'react-redux',
      'superagent',
      'superagent-bluebird-promise'
    ]
  },
  output: {
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(__dirname, './src'), loader: 'babel-loader', query: {optional: ['runtime'], stage: 0}},
      { test: /\.css?$/, loaders: [ 'style-loader', 'css-loader' ] },
      { test: /\.scss?$/, loaders: [ 'style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader'] },
      { test: /\.woff$/, loader: "url-loader?limit=10000000&mimetype=application/font-woff&name=/font/junticon.woff" },
    ],
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    root: path.resolve(__dirname, './src'),
    extensions: ['', '.js', '.jsx']
  }
};
