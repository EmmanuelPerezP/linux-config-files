var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry:  path.join(__dirname, 'src/js/index'),
  output: {
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[hash].css'
    }),
    require('autoprefixer')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: true }
          }
        ] // /use
      },
    ],
  },
}
