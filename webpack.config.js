const path = require('path');
const AngularWebpackPlugin = require('@ngtools/webpack').AngularWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: {
    main: path.resolve(path.join('./app', 'index.ts')),
  },

  output: {
    path: path.resolve(path.join('./dist')),
    filename: '[name].[chunkhash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],

    // Enable imports without relative paths.
    // https://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules'),
    ],
  },

  module: {
    rules: [
      
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: ['@ngtools/webpack'],
      },

      // For HTML templates.
      {
        test: /\.html$/,
        include: path.resolve('./app'),
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },

      {
        test: /\.[cm]?jsx?$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [
    new AngularWebpackPlugin({
      tsconfig: './tsconfig.json',
      emitClassMetadata: true
    }),

    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: 'head',
    }),
    
    new webpack.SourceMapDevToolPlugin({
      test: /\.(ts|js|css)($|\?)/i,
      filename: '[file].map',
      include: [ /js$/, /css$/ ],
      sourceRoot: 'webpack:///',
      moduleFilenameTemplate: '[resource-path]',
    }),
  ],

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /\/node_modules\//,
  //         name: "commons",
  //         chunks: "all"
  //       }
  //     }
  //   }
  // }
}