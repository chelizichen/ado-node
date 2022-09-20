const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: '/src/client/index.js', // 加载是在外层加载的
  output: {
    path:path.resolve(__dirname,"../dist"),
    filename: './static/js/main.js',
  },
  mode: 'production',
  // devtool:"source-map",
  plugins: [
    new VueLoaderPlugin(),
  ],
    module: {
     rules: [
      {
        test: /\.css$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
       },
      {
        test: /\.vue$/i,
        use: [
          // compiles Less to CSS
          "vue-loader",
        ],
        },
        {
          test: /\.(t|j)s$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        }
    ],
  },
}