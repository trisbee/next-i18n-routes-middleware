import { Request, Response } from 'express';
import { parse } from 'url';
import { getPath, getRouteMatchedObject } from '../utils/routing';
import { getPatternSupportedLangs } from '../utils/lang';
import { NextFunction } from 'connect';
import { GetNextI18nRoutesMiddleware } from './types';

let cashedPaths : {[key: string]: {data: any, template: string}} = {};

// Has to have any - next does not expose type for app (The type is called "Server" but is deeply nested and not exposed to the public)
const getNextI18nRoutesMiddleware: GetNextI18nRoutesMiddleware = (
  server,
  app,
  settings
) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    const routePatternSupportedLangs = getPatternSupportedLangs(settings.supportedLangs);

    if (!!settings.shouldHandleEmptyRoute) {
      server.get('/', (reqEndpoint: Request, resEndpoint: Response) => {
        resEndpoint.redirect(307, `${settings.supportedLangs[0]}/`);
      })
    }

    if (settings.trailingSlashRedirect === undefined) settings.trailingSlashRedirect = true;

    server.get(`${routePatternSupportedLangs}*`, (reqEndpoint: Request, resEndpoint: Response) => {

      const cache = cashedPaths[reqEndpoint.url];

      //Checks cache
      if (cache) {
        return app.render(
            reqEndpoint,
            resEndpoint,
            cache.template,
            cache.data
        );
      }

      let path = getPath(reqEndpoint.url);

      // Create response query from "lang dynamic parameter" + query string
      const lang = reqEndpoint.params.lang;
      const query = parse(reqEndpoint.url, true).query;
      const responseQuery = {...query, lang};

      // Strip trailing slash from url
      let trailingSlash = false;
      if (path.substr(-1) === '/') {
        path = path.substring(0, path.length-1)
        trailingSlash = true;
      }

      // Get RouteMatchedObject out of path
      const routeMatchedObject = getRouteMatchedObject(settings.routes, path, lang);

      // Redirects to url without trailing slash.
      if (settings.trailingSlashRedirect && trailingSlash) {
        resEndpoint.redirect(301, path);
        return;
      }

      if (!routeMatchedObject) {
        return app.render(reqEndpoint, resEndpoint, path, responseQuery);
      }

      cashedPaths[reqEndpoint.url] = {
        template: routeMatchedObject.template,
        data: { ...responseQuery, ...routeMatchedObject.params }
      }

      // Render matched route + add dynamic params to the query object
      return app.render(
        reqEndpoint,
        resEndpoint,
        routeMatchedObject.template,
        { ...responseQuery, ...routeMatchedObject.params }
      );
    });

    const handle = app.getRequestHandler();

    //prevents from double getProps calling in devEnviroment
    if (process.env.NODE_ENV !== 'production') {
      server.get(/^(?:(?!_next\/data).)*$/, (req, res) => {
        return handle(req, res);
      });
    } else {
      server.get('*', (req, res) => {
        return handle(req, res);
      });
    }

    server.post('*', (req, res) => {
      return handle(req, res)
    });

    next();
  };
};

export { getNextI18nRoutesMiddleware };
