import {Route, Redirect} from '../utils/routing/types';
import { Application, RequestHandler } from 'express';

interface NextI18nRoutesSettings {
  supportedLangs: string[],
  routes: Route[],
  redirects: Redirect[],
  shouldHandleEmptyRoute?: boolean,
}

type GetNextI18nRoutesMiddleware = (
  server: Application,
  app: any,
  settings: NextI18nRoutesSettings
) => RequestHandler;

export { NextI18nRoutesSettings, GetNextI18nRoutesMiddleware }
