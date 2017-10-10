var webpack = require('webpack');
var path = require("path");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../');
// css-modules
var values = require('postcss-modules-values');
// px2rem
var pxtorem = require('postcss-pxtorem');

var precss = require('precss')
var autoprefixer = require('autoprefixer')


const px2remOpts = {
  rootValue: 100,
  propWhiteList: [],
};

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
  entry: {
    app: './app/app.js', //编译的入口文件,
    vendor: ["react", 'react-dom', 'react-router', 'react-redux'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'), //编译到当前目录
    publicPath: './static/', //服务器根路径
    filename: '[name].js' //编译后的文件名字
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.json'], //后缀名自动补全
    fallback: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src/styles')
    ],
    alias: {
      'src': path.resolve(__dirname, '../app')
    },
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
  },
  resolveLoader: {
    fallback: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../app/css')
    ]
  },
  module: {
    // Different loaders are linked by exclamation mark(!)
    loaders: [
      {
        test: /\.css$/,
        loader: 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.less/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(eot|woff|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        loader: 'url?limit=100000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      }, {
        test: /\.js[x]?$/,
        exclude: /^node_modules$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          // es2016 polyfill (http://babeljs.io/docs/plugins/transform-class-properties/)
          plugins: ['transform-class-properties']
        }
      }, {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
    ]
  },
  // rucksackCss
  postcss: ()=> [values, precss, autoprefixer, pxtorem(px2remOpts)]

};
