const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'ReactChatSlack',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'react-chat-slack.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
      }, {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
