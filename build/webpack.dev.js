const path = require('path');
const {
  merge
} = require('webpack-merge');
const commonConfig = require('./webpack.config');
module.exports = merge(commonConfig, {
  mode: 'development',
  // devtool: 'eval-source-map',
  devServer: {
    index: 'index.html',
    hot: true,
    host: '0.0.0.0',
    inline: true,
    port: 3000,
    open: true,
    // 开发模式下写/就行啦
    // 接口代理转发
    proxy: {
      '/': {
        target: '',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});