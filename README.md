# next-i18n-routes-middleware

A middleware (+ utility tools) for having fully internationalized routes in your Next.js apps.

## How to use

1. Install this dependency: `npm i @trisbee/next-i18n-routes-middleware`
2. Prepare a [custom server](https://nextjs.org/docs/advanced-features/custom-server)
3. Prepare a your routes catalog in compliance with [Next-i18n-routes routing convention](https://github.com/trisbee/next-i18n-routes-middleware/blob/master/docs/ROUING_CONVENTION.md)
4. Set up `NextI18nRoutesMiddleware` such as in the example below:
```
    const express = require("express");
    const next = require("next");
    const getNextI18nRoutesMiddleware = require("@trisbee/next-i18n-routes-middleware").getNextI18nRoutesMiddleware;
    const routes = require('./routes').routes;

    const app = next({ isInDevMode });
    
    app.prepare().then(() => {
      const server = express();
      
      server.use(
        getNextI18nRoutesMiddleware(
            server,
            app,
            { 
                supportedLangs: ['en', 'de', 'cs'],
                routes: routes,
                shouldHandleEmptyRoute: true
            }
        )
      );
    
      server.listen(process.env.PORT || 3000);
    });
```

