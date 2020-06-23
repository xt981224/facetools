/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-12 12:59:46
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-17 19:43:42
 */ 
// see http://vuejs-templates.github.io/webpack for documentation.
let path = require("path");
var webpack = require("webpack");
module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    staticPath: "/",
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require("./dev.env"),
    port: 9527,
    autoOpenBrowser: false,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "http://47.103.124.63:9710/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/file": {
        target: "http://47.103.124.63:9710/upload/uploadSingle?trace=true&projectName=ysd&needCompass=false&needWaterMark=false&projectKeyCode=dpgZSFzDRy8mcJBb&specialName=C-GUR618&onCloud=false",
        changeOrigin: true,
        pathRewrite: {
          "^/file": "/file",
        },
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
};
