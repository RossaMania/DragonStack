const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/account',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    })
  );
};