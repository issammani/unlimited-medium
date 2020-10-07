const path = require("path");
const CopywebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const __app_dirname = (subdir) => __dirname + "/app/" + subdir;

module.exports = {
  entry: {
    background: path.resolve(__app_dirname("src/js"), "background.js"),
  },

  output: {
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CopywebpackPlugin({
      patterns: [
        { from: __app_dirname("assets"), to: "assets" },
        { from: __app_dirname("manifest.json"), to: "manifest.json" },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
  ],
};
