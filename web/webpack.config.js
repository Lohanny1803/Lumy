const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './web/index.web.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash:8].js' : 'bundle.js',
      publicPath: '/',
      clean: true,
    },
    devtool: isProduction ? false : 'eval-source-map',
    resolve: {
      extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.ts', '.tsx'],
      alias: {
        'react-native$': 'react-native-web',
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules\/(?!react-native|@react-native|react-native-vector-icons|@react-navigation)/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: false,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: isProduction
                      ? '> 0.5%, last 2 versions, not dead'
                      : 'last 2 chrome versions',
                  },
                ],
                ['@babel/preset-react', {runtime: 'automatic'}],
                '@babel/preset-typescript',
              ],
              plugins: ['react-native-web'],
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './web/index.html',
        inject: true,
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(!isProduction),
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development',
        ),
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      moduleIds: isProduction ? 'deterministic' : 'named',
    },
  };
};
