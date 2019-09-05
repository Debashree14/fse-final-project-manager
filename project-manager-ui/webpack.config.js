const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
     /* {
                test: /\.css$/,
                // exclude: /node_modules/,
                loader: 'style-loader!css-loader?importLoaders=1'
            },*/
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: {
                    limit: 100000
                }
            },
            {
                test: /\.jpg$/,
                loader: "url-loader"
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.(woff2?)(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                }
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader'
            }
    ]
  },
   resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.json']
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};