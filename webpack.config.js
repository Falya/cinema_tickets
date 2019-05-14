const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'app'),
  watch: true,
  output: {
    path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
  },
  devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		port: 8080,
		historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      inject: 'head'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      options: {
        presets: ['env', 'react']
      },
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
};
