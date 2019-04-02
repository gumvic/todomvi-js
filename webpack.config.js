const path = require('path');

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "bundle.js"
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "h"
              }]
            ]
          }
        }
      }
    ]
  }
};
