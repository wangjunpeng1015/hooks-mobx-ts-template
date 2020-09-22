const path = require('path')
//多线程打包
const HappyPack = require('happypack')
const os = require('os')
//共享进程池子进程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
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
        test: /\.js(x?)$/,
        // use: ['babel-loader'],
        use: ['happypack/loader?id=babel'],
        include: path.resolve(__dirname, srcDir),
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        // use: ['babel-loader', 'awesome-typescript-loader'],
        // use: ['babel-loader'],
        use: ['happypack/loader?id=babel'],
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
              outputPath: 'static/images',
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, srcDir),
        use: ['happypack/loader?id=scss'],
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
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            // 2.使用bable,新语法转成es5语法
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }], // 配置对装饰器的支持
              ['@babel/plugin-proposal-class-properties', { loose: true }], // 支持类属性的插件
            ],
          },
        },
      ],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'scss',
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: [
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
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              // 这里按照你的文件路径填写
              path.resolve(__dirname, `${srcDir}/styles/variables.scss`),
            ],
          },
        },
      ],
      threadPool: happyThreadPool,
    }),
  ],
}
