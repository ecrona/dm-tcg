import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const config: webpack.Configuration = {
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve('./src/client'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './src/client/tsconfig.json' })
    ]
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.svg?$/,
        loaders: ['file-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './public/index.html'
    })
  ],

  devtool: 'source-map'
}

export default config
