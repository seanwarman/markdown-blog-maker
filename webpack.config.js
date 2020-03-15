const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
const { publicPath, url } = require('./credentials.js')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

    // This publicPath makes sure that the bundle.js script can be gotten from
    // anywhere. Js doesn't control the routing so when we go to a different 
    // uri the html has to redefine where to get it's resources from so putting
    // the bucket's address here gives the src attribute a full base path.
    publicPath
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

      // file-loader is doing most of the work to get the
      // posts and put them in the right place.
      // This is currently a little bit tricky because 
      // if I move any of these files to different dirs
      // the s3 can lose them easily.
      //
      // What I really want is to have this folder structure
      // icelated in a folder of it's own. At the moment the seperate
      // post categories (posts and design-patterns) are just kept in
      // the project root which isn't ideal.
      //
      // Once that's done we can start having all this logic
      // looped over and automatic so that when a new folder is
      // created the whole project just updates and adapts to it.
      {
        test: /\.md$/,
        loader: 'file-loader',
        options: { 
          name: '[name].[ext]',
          outputPath: (filename, resPath, context) => {
            if(/archive/.test(resPath)) {
              return 'posts/archive/' + filename
            }
            if(/design-patterns/.test(resPath)) {
              return 'posts/design-patterns/' + filename
            }
            return '/' + filename
          }
        },
      }
    ]
  }
}
