const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'node',
  entry: './main.js',
  mode: 'production',
  plugins: [ new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }) ],
  output: { path: path.resolve('./'), filename: './tool' }
}
