import fs from "fs";
import os from "os";
import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import dotenv from "dotenv";
import chalk from "chalk";

// make log statements colorful
const info = chalk.blue;
const warn = chalk.bold.yellow;
const error = chalk.bold.red;

// color for recommend vscode packages to install with recommended
const recommended = chalk.bold.magentaBright;

// dotenv package is needed to read the root .env file and append variables to process.env
dotenv.config();

// set the environment to dev or prod
const env =
  process.env.NODE_ENV === "production" ? "production" : "development";

const port = Number(process.env.NODE_PORT) || 5000;

// webpack configuration object
const config: Configuration = {
  // determine webpack optimizations
  mode: env,

  /*
  see:
  [HMR] Updated modules:
    [HMR]  - ./../MyModule1.jsx
    [HMR]  - ./../MyModule2.jsx

  instead of:
  [HMR] Updated modules:
    [HMR]  - 1009
    [HMR]  - 1007

  Note: this invalidates the new webpack.NamedModulesPlugin()
   */
  optimization: {
    namedModules: true
  },

  // enable sourcemaps for debugging webpacks output
  // devtool: 'eval-source-map',
  devtool: "source-map",

  // directory tree to start bundling files
  entry: { app: "./app/index.tsx" },

  // directory to save webpack bundled files
  output: {
    // create and save bundled files to a folder named dist
    path: path.resolve(__dirname, "dist"),

    // create a subfolder for hot update files to go
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
    // was breaking webpack dev server (cannot get / error)
    // publicPath: path.resolve(__dirname, 'dist'),
    publicPath: "/",

    // name of the bundled file
    filename: "bundle.js"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      // patch react-dom package to enable react 16.6+ features
      "react-dom": "@hot-loader/react-dom"
    },
    plugins: [
      // allows typescript to recognize paths defined in paths in the tsconfig.json
      new TsconfigPathsPlugin()
    ]
  },

  // fixed issue with twitter package
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },

  devServer: {
    // open app in a new tab
    open: false,

    // open page to dashboard
    openPage: "dashboard",

    // enable hmr
    hot: true,

    after: () =>
      console.log(`app is being served at https://localhost:${port}`),

    // enable gzip compression for everything served
    compress: true,

    // watch for file changes
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    // creates dist folder
    // writeToDisk: true,

    // all 404s redirect to index.html
    historyApiFallback: true,

    // files are served from the dist folder created in memory by dev server
    // tells the path where to take static files
    contentBase: path.resolve(__dirname, "dist"),

    // was breaking webpack dev server (cannot get / error)
    // publicPath: path.resolve(__dirname, 'dist'),
    publicPath: "/",

    // Show full-screen compiler errors overlaid in the browser
    overlay: true,

    // url that will open when you run the start script
    // host: process.env.NODE_URL,

    // configure https
    https: true,

    // setup the port
    port,

    // only log relevant statistics
    stats: {
      // renders various colored text output during webpack build
      colors: true,
      // adds the hash of the build
      hash: false,
      // adds timing info: ie "Time: 17007ms"
      timings: true,
      // would display chunk info
      chunks: false,
      // would display built modules info to chuck info
      chunkModules: false,
      // would display built modules info
      modules: false,

      entrypoints: false,

      assets: false
    }
  },

  module: {
    // the order of loaders matters
    // first transpile the tsx files through babel-loader, then through ts-loader
    rules: [
      {
        // look for all typescript and react files
        test: /\.tsx?$/,
        // dont transpile node_modules
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              // cache previous babel transpilations
              cacheDirectory: false,
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                "react-hot-loader/babel",
                "@babel/plugin-transform-react-jsx-source", // add source file and line numbers to jsx
                // fixes regenerator runtime error
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true
                  }
                ],
                // fixes exports is not defined error
                "@babel/plugin-transform-modules-commonjs"
              ]
            }
          },
          "ts-loader"
        ]
      },
      {
        test: /\.(sa|c)ss$/,
        use: [
          // style-loader (css hmr) for dev, extractCssChunks (seperate css files) for prod
          env === "development" ? "style-loader" : ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 }
          },
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    // delete all files in the dist directory before each build
    new CleanWebpackPlugin(["dist"]),

    // runs typescript type checker on a separate process so that its faster
    // results in the green "no type errors found" message when compiling
    // new ForkTsCheckerWebpackPlugin(),

    // needed in for --hot parameter to work in webpack-dev-server
    new webpack.HotModuleReplacementPlugin(),

    // 1. import dotenv
    // 2. dotenv.config() immediately after
    // 3. this line adds environment variables to the bundle
    new webpack.EnvironmentPlugin([
      "NODE_SETTING",
      "CONSUMER_KEY",
      "CONSUMER_SECRET",
      "ACCESS_TOKEN_KEY",
      "ACCESS_TOKEN_SECRET"
    ]),

    // enables hmr for css changes
    new ExtractCssChunks({ filename: "css/style.css" }),

    // create index.html file in dist folder during 'npm run build'
    // base the index file off of the one in the public folder
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body"
    })
  ]
};

export default config;
