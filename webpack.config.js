const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'))
                .filter(fileName => fileName.endsWith('.html'));

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {from: 'src/assets/images', to: 'assets/images'}
        ],
      }),
      ...pages.map(page => new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'pages', page),
        filename: page,
        chunks: ['main']
      }))
    ],
  }
}