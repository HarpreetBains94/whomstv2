const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../client"),
  devServer: {
    proxy: {
      "^/backend": {
        target: "http://localhost:3000",
        pathRewrite: { "^/backend/": "/" },
        changeOrigin: true,
      },
    }
  },
  transpileDependencies: ["vuetify"]
};
