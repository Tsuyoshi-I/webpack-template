
const MODE = "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fileName = MODE == 'production' ? '[name]-[hash]' : '[name]';

module.exports = {
  mode: MODE,
  entry: {
    main: "./src/js/main.js",
    sub: "./src/js/sub.js"
  },
  output: {
    filename: `${fileName}.js`,
    path: __dirname + "/dist"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', ':data-src']
          }
        }
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              name: `./img/${fileName}.[ext]`,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {'modules': false},
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: "main.html",
      template: 'src/main.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['sub'],
      filename: "sub.html",
      template: 'src/sub.html'
    }),
    new CleanWebpackPlugin(),
  ], 
}