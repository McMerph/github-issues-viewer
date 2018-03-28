const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/view/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
      }
    }),
    new FaviconsWebpackPlugin('./src/view/resources/favicon.svg')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // adds CSS to the DOM by injecting a <style> tag
          { loader: 'style-loader' },
          // interprets @import and url() like import/require() and will resolve them
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ['babel-loader', 'awesome-typescript-loader', 'stylelint-custom-processor-loader']
      },
      {
        test: /\.(jpe?g|png|webp|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'asset/[name]-[sha512:hash:base64:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    publicPath: '/'
  }
};
