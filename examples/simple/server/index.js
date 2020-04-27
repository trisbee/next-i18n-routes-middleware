// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const routes = require('./routes').routes;
const supportedLangs = require('./routes').supportedLangs;
const express = require("express");
const next = require("next");
const getNextI18nRoutesMiddleware = require("@t_rik/next-i18n-routes").getNextI18nRoutesMiddleware;

const isInDevMode = process.env.NODE_ENV !== "production";
const app = next({ isInDevMode });

app.prepare().then(() => {
  const server = express();
  server.use(getNextI18nRoutesMiddleware(server, app, { supportedLangs: supportedLangs, routes: routes, shouldHandleEmptyRoute: true }));

  server.listen(process.env.PORT || 3000);
});