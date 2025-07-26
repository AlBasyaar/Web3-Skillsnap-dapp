const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Pastikan file ini ada
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.CANISTER_ID_SKILLSNAP_BACKEND': JSON.stringify(
        process.env.CANISTER_ID_SKILLSNAP_BACKEND || 'ryjl3-tyaaa-aaaaa-aaaba-cai' // Default canister ID for local development
      ),
      'process.env.DFX_NETWORK': JSON.stringify(process.env.DFX_NETWORK || 'local'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: 'favicon.ico',
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
