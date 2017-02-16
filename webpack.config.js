var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

let cssLoaderQuery = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader';
module.exports = {
  entry: {
    'main' : './src/index.js'
  },

  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: cssLoaderQuery }) },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.css/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer'),
                  require('postcss-color-rebeccapurple-loader')
                ];
              }
            }
          }
        ]
      }
    ]
  },

  // postcss: [
  //   require('autoprefixer'),
  //   require('postcss-color-rebeccapurple')
  // ],

  resolve: {
    modules: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
    new StaticSiteGeneratorPlugin('main', '/', {
      //static: true,
      //template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
    })
  ]
};
