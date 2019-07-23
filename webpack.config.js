const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  return {
    context: __dirname,
    mode: 'production',
    entry: {
      app: path.join(__dirname, 'src', 'index'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: env === 'production' ? '' : 'cheap-module-eval-source-map',
    devServer: {
      overlay: true,
      port: 8080,
      historyApiFallback: true,
    },
    optimization: {
      minimizer: env === 'production' ? [new UglifyJsPlugin()] : [],
      minimize: env === 'production' ? true : false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new FaviconsWebpackPlugin('./public/icons/favicon.png'),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[hash].css',
        chunkFilename: 'styles/[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'head',
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
    ],
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [path.resolve(__dirname, 'src')],
          exclude: [path.resolve(__dirname, 'node_modules')],
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-class-properties'],
          },
          loader: 'babel-loader',
        },
        {
          test: /\.woff(2)?(\?[a-z0-9]+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
  };
};
