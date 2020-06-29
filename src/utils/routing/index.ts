import { match as createMatcher } from 'path-to-regexp';
import { Route, Redirect } from './types';
import { getPathParsed, sliceOutQueryString } from './utils';

const getPath = (url: string): string => {
  const path = sliceOutQueryString(url);

  if (path === "") {
    return '/'
  }

  return path
};

const getRouteMatchedObject = (routes: Route[], path: string, currentLang: string) => {
  // 1) get matched route
  const routeMatched = routes.find((route: Route) => {
    const match = createMatcher(route.aliases[currentLang]);

    return !!match(path);
  });

  if (!routeMatched) {
    return undefined;
  }

  // 2) Parse path
  const pathParsed = getPathParsed(routeMatched, path, currentLang);

  if (!pathParsed) {
    return undefined;
  }

  // 3) Put it together
  return  {
    template: routeMatched.template,
    params: pathParsed.params
  };
};

const getPermanentRedirect = (redirects: Redirect[], path: string) => {
  let redirectTo = null;
  redirects.forEach(redirect => {
    if (redirect.from === path) {
      redirectTo = redirect.to;
    }
  });

  return redirectTo;
};

export { getPath, getRouteMatchedObject, getPermanentRedirect }
