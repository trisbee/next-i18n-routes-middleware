const supportedLangs = ['cs', 'en'];

// Used for Links throughout FE app
// - `route:xxx` pattern is necessary, so that `route.id` is unique and can never be the same as an alias in any language
// - all routes are automatically mentioned in sitemap.xml on build, unless route has `noIndex` prop set to true
const paths = {
  homepage: "/route:homepage",
  subpage: '/route:subpage',
  dynamic: "/route:dynamic",
  dynamicComplex: '/route:dynamicComplex',
  brand: "/route:brand",
  model: "/route:model",
  year: "/route:year"
};

const routes = [
  {
    id: paths.homepage,
    template: "/",
    aliases: {
      cs: "/cs/",
      en: "/en/"
    }
  },
  {
    id: paths.subpage,
    template: "/subpage",
    aliases: {
      cs: "/cs/podstranka",
      en: "/en/subpage",
    }
  },
  {
    id: paths.dynamic,
    template: "/dynamic",
    aliases: {
      cs: "/cs/dynamicka/:x",
      en: "/en/dynamic/:x"
    }
  },
  {
    id: paths.dynamicComplex,
    template: "/nested/dynamicComplex",
    aliases: {
      cs: "/cs/dynamicka/:x/komplikovana/:y",
      en: "/en/dynamic/:x/complex/:y"
    }
  },
  {
    id: paths.brand,
    template: "/[brand]",
    aliases: {
      cs: "/cs/:brand",
      en: "/en/:brand"
    }
  },
  {
    id: paths.model,
    template: "/[brand]/[model]",
    aliases: {
      cs: "/cs/:brand/:model",
      en: "/en/:brand/:model"
    }
  },
  {
    id: paths.year,
    template: "/[brand]/[model]/[year]",
    aliases: {
      cs: "/cs/:brand/:model/:year",
      en: "/en/:brand/:model/:year"
    }
  },
];

module.exports.supportedLangs = supportedLangs;
module.exports.paths = paths;
module.exports.routes = routes;