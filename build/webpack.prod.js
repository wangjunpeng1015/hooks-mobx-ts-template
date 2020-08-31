const webpack = require("webpack");
const {
  merge
} = require('webpack-merge');
const commonConfig = require('./webpack.config');
// 打包前先清空输出目录
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 压缩JS的插件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
// 分离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "chunk/[id].[contenthash:8].css"
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [
      new CleanWebpackPlugin(),
      new UglifyWebpackPlugin({
        parallel: 4
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
})