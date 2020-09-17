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
    // 输出文件的目标路径
    path: path.resolve(__dirname, '../dist'),
    // 输出的文件名
    filename: '[name].[chunk:8].js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
    // 输出解析文件的目录。静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    publicPath: '/',
  },
  devServer: {
    hot: true,
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
