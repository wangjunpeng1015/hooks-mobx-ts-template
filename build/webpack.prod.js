const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config')
//打包gzip
const CompressionPlugin = require('compression-webpack-plugin')
// 复制静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 打包前先清空输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩JS的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //用于压缩、去重
const readEnv = require('./readEnv')
const env = readEnv('../.env.production')
module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  // 出口
  output: {
    // 输出文件的目标路径
    path: path.resolve(__dirname, '../dist'),
    // 输出的文件名
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    // 输出解析文件的目录。静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境和变量
      'process.env': {
        NODE_ENV: "'production'",
        ...env,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css[id].[contenthash:8].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/static'),
        },
      ],
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8,
      threshold: 10240, //对进行超过10K的压缩
      deleteOriginalAssets: false, //是否删除源文件
    }),
  ],
  optimization: {
    minimizer: [
      new CleanWebpackPlugin(),
      new UglifyJsPlugin({
        cache: true, //启用缓存
        parallel: true, // 使用多进程运行改进编译速度
        sourceMap: false, //生成sourceMap映射文件
        uglifyOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true, //去掉debugger
            drop_console: true, //去掉console
          },
          output: {
            comments: false, // 去掉注释
          },
        },
      }),
      new OptimizeCssAssetsWebpackPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // only package third parties that are initially dependent
        },
        commons: {
          name: 'commons', //提取出来的文件命名
          test: path.resolve(__dirname, '../src/components'),
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
        },
      },
    },
    runtimeChunk: 'single',
  },
})
