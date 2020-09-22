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
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist-dev'),
    hot: true,
    // overlay: true,//报错是否显示在窗口上
    host: '0.0.0.0',
    inline: true,
    port: 3000,
    compress: true, //开启gzip
    open: true,
    hotOnly: true,
    disableHostCheck: true,
    publicPath: '/',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // 定义环境和变量
      'process.env': {
        NODE_ENV: "'development'",
        ...env,
      },
    }),
  ],
  optimization: {
    namedModules: true,
  },
})
