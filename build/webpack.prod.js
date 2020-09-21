const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config')
// 打包前先清空输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩JS的插件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const readEnv = require('./readEnv')
const env = readEnv('../.env.production')
module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  // 出口
  output: {
    // 输出文件的目标路径
    path: path.resolve(__dirname, '../smart-sanitation'),
    // 输出的文件名
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
    // 输出解析文件的目录。静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    publicPath: './',
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash:8].css',
    //   chunkFilename: 'chunk/[id].[contenthash:8].css',
    // }),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      // 定义环境和变量
      'process.env': {
        NODE_ENV: "'production'",
        ...env,
      },
    }),
  ],
  optimization: {
    minimizer: [
      // new CleanWebpackPlugin(),
      // new UglifyWebpackPlugin({
      //   parallel: 4,
      // }),
      // new OptimizeCssAssetsWebpackPlugin(),
    ],
  },
})
