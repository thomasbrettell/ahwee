const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': [
      './src/index.ts'
   ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    publicPath: "/dist/",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: ['web', 'es3'],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
  ],
};