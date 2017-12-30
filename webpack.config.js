const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: {
    'dist/react-chat-slack': './src',
    'docs/dist/bundle': ['babel-polyfill', './docs'],
  },
  output: {
    library: 'ReactChatSlack',
    libraryTarget: 'umd',
    path: path.join(__dirname),
    filename: '[name].js',
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
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
