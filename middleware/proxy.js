const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
  secure: false,
   onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:1234';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  },
  logLevel: 'debug', // Enable logging for debugging purposes
});

module.exports = apiProxy;

// 'apiProxy' is now ready to be used as middleware in a server.