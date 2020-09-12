const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config')

const readEnv = require('./readEnv')
const env = readEnv('../.env.development')

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
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
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境和变量
      'process.env': {
        NODE_ENV: "'development'",
        ...env,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
