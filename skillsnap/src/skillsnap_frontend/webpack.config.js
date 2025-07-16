const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
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
        require(path.resolve(__dirname, '../../.dfx/local/canister_ids.json')).skillsnap_backend.local
      ),
      'process.env.DFX_NETWORK': JSON.stringify('local'),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0', // 🧠 penting agar bisa diakses dari luar container
    open: true,
  },

};
