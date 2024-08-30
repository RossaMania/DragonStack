const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
  secure: false,
});

module.exports = apiProxy;

// 'apiProxy' is now ready to be used as middleware in a server.