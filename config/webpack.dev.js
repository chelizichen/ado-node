const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: '/src/client/index.js', // 加载是在外层加载的
  output: {
    filename: 'dist/static/js/main.js',
  },
  mode: 'development',
  // devtools:"clean-module-source-map",
  devServer: {
    port: 3001,
    open: true,
    // static: "dist/static",
    hot:true
  },
  plugins: [
    new VueLoaderPlugin()
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
          "vue-loader",
        ],
       },
       {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
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
      },
    ],
  },
}