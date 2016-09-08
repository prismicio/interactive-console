/*eslint-env node */

require('es6-promise').polyfill();
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  devtool: 'source-map',
  output: {
    filename: 'prismic-console.js',
    libraryTarger: 'var ',
    library: 'PrismicConsole'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.css']
  },
  resolveLoader: {
    modulesDirectories: [path.join(__dirname, 'node_modules')]
    // modulesDirectories: ['node_modules', 'src', 'typings']
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }
    ],
    preLoaders: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
/*  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },*/
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
