const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
// used to do the typechecking in a seperate process so the transpiling will be handled only by tsloader.
// speed up compilation of code
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/bin/www.ts',
  target: 'node',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[id].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    // to be run after every build
    new WebpackShellPlugin({
      onBuildEnd: ['yarn run:dev']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: NODE_ENV !== 'development' ? 'tsconfig.prod.json' : 'tsconfig.json',
              transpileOnly: true
            }
          }
        ],
      }
    ]
  }
}