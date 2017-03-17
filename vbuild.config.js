const path = require('path')

module.exports = {
  entry: {
    client: './src/index.js'
  },
  html: {
    inject: false,
    minify: false,
    title: 'web4',
    template: './template.html',
  },
  port: 5454,
  vendor: false
}
