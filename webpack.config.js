const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')

const { Bucket, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./credentials')

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/index.js', // default in wp 5
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // default in wp 5
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
    // new GoogleFontsPlugin({fonts: [
    //   { family: "Nunito" },
    //   { family: "News Cycle" },
    //   { family: "Fanwood Text" },
    // ]}),

    new CompressionPlugin({
      test: /\.(js|css)$/i,
      filename: '[dir]/[name][ext]',
      algorithm: 'gzip',
      deleteOriginalAssets: true
    }),

    new S3Plugin({
      s3Options: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'eu-west-1'
      },
      s3UploadOptions: {
        Bucket,
        ContentEncoding(fileName) {
          if(/\.(js|css)$/i.test(fileName)) {
            return 'gzip'
          }
        },
        ContentType(fileName) {
          if(/\.css/.test(fileName)) {
            return 'text/css'
          }
          if(/\.js/.test(fileName)) {
            return 'text/javascript'
          }
        }
      },
      directory: 'dist'
    })

  ],
  module: {
    rules: [
      {
        test: /\.ttf$/i,
        type: 'asset/resource',
      },
      {test: /\.(js)$/,  use:'babel-loader'},
      {test: /\.css$/,   use:[ 'style-loader', 'css-loader', ]},
      {
        test: /\.(jpeg|jpg|gif|png|svg)$/,
        loader: 'file-loader',
        options: { 
          name: '[name].[ext]'
        },
      },
    ]
  }
}
