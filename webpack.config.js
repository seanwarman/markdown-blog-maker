const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: [ 'babel-polyfill', './src/index.js' ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    // Allows the dev server to catch all routes and not just '/'
    historyApiFallback: true
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new GoogleFontsPlugin({fonts: [
      { family: "Nunito" },
      { family: "News Cycle" },
      { family: "Fanwood Text" },
    ]}),
  ],
  module: {
    rules: [
      {test: /\.(js)$/,  use:'babel-loader'},
      {test: /\.css$/,   use:[ 'style-loader', 'css-loader', ]},
      {
        test: /\.(jpeg|jpg|gif|png|svg)$/,
        loader: 'file-loader',
        options: { 
          name: '[name].[ext]'
        },
      }
    ]
  }
}
