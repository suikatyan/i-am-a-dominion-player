const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/ts/index.ts",
  output: {
    path: path.join(__dirname, "dist", "js"),
    publicPath: "js/",
    filename: "app.js",
  },
  resolve: {
    modules: [
      path.resolve("./src/ts"),
      "node_modules",
    ],
    extensions: [
      ".webpack.js",
      ".web.js",
      ".ts",
      ".tsx",
      ".js",
    ],
    alias: {
      vue: "vue/dist/vue.esm.js",
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: "ts-loader"},
        ],
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production"),
    //   }
    // }),
  ],
}
