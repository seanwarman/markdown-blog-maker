const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
 
module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://seanblog.com.s3-website.eu-west-2.amazonaws.com'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new GoogleFontsPlugin({fonts: [
      { family: "Nunito" },
    ]}),
    new HtmlWebpackPlugin({
      title: 'Stuff That\'s Tough'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(jpeg|jpg|gif|png|svg)$/,
        loader: 'file-loader',
        options: { 
          name: '[name].[ext]'
        },
      },
      {
        test: /\.md$/,
        loader: 'file-loader',
        options: { 
          name: '[name].[ext]',
          outputPath: (url, resPath, context) => {
            if(/posts/.test(resPath)) {
              return 'posts/' + url
            }
            if(/design-patterns/.test(resPath)) {
              return 'design-patterns/' + url
            }
            return '/' + url
          }
        },
      }
    ]
  }
}
