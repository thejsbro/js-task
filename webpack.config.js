const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './src/index.tsx',
  devServer: {
    contentBase: path.join(__dirname, '/'),
    publicPath: '/',
    // hot: true,
    // compress: true,
    host: 'localhost',
    port: 3000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // require('html-webpack-template'),
      inject: true,
      appMountId: 'root',
      title: 'AUTO-1'
      // template: 'public/index.html'
      // devServer: 'http://localhost:3000'
    })
  ],
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src/common/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }/*, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      } , {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      } */
      ,{
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ],
  }
};
