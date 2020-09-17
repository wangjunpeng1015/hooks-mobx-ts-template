const path = require('path')
// 打包html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //分离出CSS
const isDev = process.env.NODE_ENV !== 'production'
const srcDir = path.join(__dirname, '../src')

module.exports = {
  mode: 'development',
  // 入口 这里应用程序开始执行
  entry: [path.resolve(__dirname, `${srcDir}/index.tsx`)],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, './src.v2'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, srcDir),
      '@/layouts': path.resolve(__dirname, `${srcDir}/layouts`),
      '@/utils': path.resolve(__dirname, `${srcDir}/utils`),
      '@/pages': path.resolve(__dirname, `${srcDir}/src/pages`),
      '@/components': path.resolve(__dirname, `${srcDir}/components`),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    legacy: true,
                  },
                ],
              ],
            },
          },
        ],
        include: path.resolve(__dirname, srcDir),
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        use: [
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, srcDir),
      },
      {
        test: /\.css/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
        ],
        // exclude: /node_modules/, //屏蔽不需要处理的文件夹
        // include: path.resolve(__dirname, srcDir) //手动指定必须处理的文件夹
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, srcDir),
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'sass-loader', // 将 Sass 编译成 CSS
            options: {
              additionalData: `@import "@/styles/variables.scss";`,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#009a63;', // 全局主色
                  // 'link-color': '#1DA57A',
                  // 'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `${srcDir}/index.html`),
      inject: 'body',
    }),
  ],
}
