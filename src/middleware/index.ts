import { Request, Response } from 'express';
import { parse } from 'url';
import { getPath, getRouteMatchedObject, getPermanentRedirect } from '../utils/routing';
import { getPatternSupportedLangs } from '../utils/lang';
import { NextFunction } from 'connect';
import { GetNextI18nRoutesMiddleware } from './types';

// Has to have any - next does not expose type for app (The type is called "Server" but is deeply nested and not exposed to the public)
const getNextI18nRoutesMiddleware: GetNextI18nRoutesMiddleware = (
  server,
  app,
  settings
) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    const routePatternSupportedLangs = getPatternSupportedLangs(settings.supportedLangs);

    if (!!settings.shouldHandleEmptyRoute) {

      console.warn("----------- what settings.shouldHandleEmptyRoute");

      server.get('/', (reqEndpoint: Request, resEndpoint: Response) => {
        resEndpoint.redirect(307, `${settings.supportedLangs[0]}/`);
      })
    }

    server.get(`${routePatternSupportedLangs}/*`, (reqEndpoint: Request, resEndpoint: Response) => {
      const path = getPath(reqEndpoint.url);

      // Create response query from "lang dynamic parameter" + query string
      const lang = reqEndpoint.params.lang;
      const query = parse(reqEndpoint.url, true).query;
      const responseQuery = {...query, lang};

      // permanent redirect with 301 from server
      const redirectTo = getPermanentRedirect(settings.redirects, path);
      if (redirectTo) {
          console.log('301 redirect from: `' + path + '` to: `' + redirectTo + '`');
          resEndpoint.redirect(301, redirectTo);
          return;
      }

      // Get RouteMatchedObject out of path
      const routeMatchedObject = getRouteMatchedObject(settings.routes, path, lang);
      if (!routeMatchedObject) {
        return app.render(reqEndpoint, resEndpoint, path, responseQuery);
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

    server.get("*", (req: Request, res: Response) => {
      handle(req, res);
    });

    server.post('*', (req: Request, res: Response) => {
      return handle(req, res)
    });

    next();
  };
};

export { getNextI18nRoutesMiddleware };
