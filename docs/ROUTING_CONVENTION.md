# Routing convention

## Paths
`Paths` is an object listing `ids` of all your routes. It is useful to have your route ids in a separate object so that it's easier to find routes.

convention:
```
const paths = {
    [name: string]: string
}
```
example:
```
const paths = {
  homepage: "/route:homepage",
  brand: "/route:brand",
  model: "/route:model",
};
```

## Routes
Routes is an array of routes. One route is an object comprised of:  
- `id: string`
- `template: string` - a path to a next page in `pages` directory
- `aliases` - on object comprised of `url paths` 

convention:
```
const routes = [
  {
    id: string,
    template: string,
    aliases: {
      [lang: string]: string,
    }
  },
]
```

example:
```
const routes = [
  {
    id: paths.homepage,
    template: "/",
    aliases: {
      en: "/en"
      cs: "/cs",
    }
  },
  {
    id.paths.brand,
    template: "/[brand]",
    aliases: {
      en: "/en/:brand"
      cs: "/cs/:brand",
    }
  }
];
