const { createProxyMiddleware } = require("http-proxy-middleware");
const { CATEGORY_SERVICE } = require("../config/env");

module.exports = createProxyMiddleware({
  target: CATEGORY_SERVICE,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return "/api/category" + path;
  },

  logger: console,
});
