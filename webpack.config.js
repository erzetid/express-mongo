import webpackNodeExternals from 'webpack-node-externals';
import WebpackObfuscatorPlugin from 'webpack-obfuscator';

const config = {
  entry: './app.js',
  externals: [webpackNodeExternals()],
  devtool: 'source-map',
  output: {
    filename: './bundle.cjs'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: './node_modules/babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.js$/,
        enforce: 'post',
        use: {
          loader: WebpackObfuscatorPlugin.loader,
          options: {
            rotateStringArray: true
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackObfuscatorPlugin(
      {
        rotateStringArray: true
      },
      ['excluded_bundle_name.js']
    )
  ]
};

export default config;
