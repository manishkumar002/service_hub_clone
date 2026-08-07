const { createProxyMiddleware } = require("http-proxy-middleware");
const { AUTH_SERVICE } = require("../config/env");

module.exports = createProxyMiddleware({
  target: AUTH_SERVICE,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return "/api/auth" + path;
  },

  logger: console,
});
