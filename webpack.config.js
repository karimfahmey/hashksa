const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = resolve(__dirname, "");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  context: __dirname,
  entry: {
    bundle: path.resolve(APP_DIR, "src/index.js"),
  },
  output: {
    path: path.resolve(APP_DIR, "dist"),
    filename: "[name]-[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name]-[contenthash][ext]",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    modules: [APP_DIR, "node_modules"],
  },
  devServer: {
    static: {
      directory: path.resolve(APP_DIR, "dist"),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      // sass-loader
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "assets/img/[name]-[contenthash].[ext]",
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "assets/fonts/[name]-[contenthash].[ext]",
          },
        },
      },
      {
        test: /\.woff2?$/i,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]";
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      hash: false,
    }),
  ],
};
