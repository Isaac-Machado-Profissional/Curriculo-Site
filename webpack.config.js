const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'about-me.html',
      filename: 'about-me.html',
    }),
    new HtmlWebpackPlugin({
      template: 'formation.html',
      filename: 'education.html',
    }),
    new HtmlWebpackPlugin({
      template: 'knowledge.html',
      filename: 'knowledge.html',
    }),
    new HtmlWebpackPlugin({
      template: 'contact.html',
      filename: 'contact.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'images', to: 'images' },
      ],
    
})],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true,
  },
};
