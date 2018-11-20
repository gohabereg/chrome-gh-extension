const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

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
    extensions: ['.js', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
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
    ]),

    new DotenvPlugin({
      sample: './.env.sample',
      path: './.env'
    })
  ],

  optimization: {
    minimize: NODE_ENV === 'production'
  }
}