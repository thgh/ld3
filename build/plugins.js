// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

var glob = require('glob');
var webpack = require('webpack');

webpack({
  watch: true,
  entry: {
    Invoice: './src/plugins/Invoice.js'
  },
  output: {
    path: './static/plugins',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      exclude: /node_modules/
    }]
  }
}, function(err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    children: false,
    chunkModules: false,
    chunks: false,
    hash: false,
    modules: false,
    version: false,
  }) + '\n');
});
