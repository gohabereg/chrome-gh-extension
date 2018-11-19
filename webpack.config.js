const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {NODE_ENV = 'development'} = process.env;

module.exports = {
  entry: {
    background: [ './src/background/index' ],
    popup: ['./src/popup/index']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup/index.html'
    }),

    new CopyWebpackPlugin([
      {from: './src/manifest.json'},
      {context: './src/assets', from: 'icon-**', to: 'assets'}
    ])
  ],

  optimization: {
    minimize: NODE_ENV === 'production'
  }
}