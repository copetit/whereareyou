import proxy from 'http-proxy-middleware';

module.exports = function (app) {
  const headers = {
    'Content-Type': 'application/json',
  };
  app.use(
    proxy('/v1/wau/locations', {
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false,
      headers: headers,
    }),
  );
};
