import { Match } from 'path-to-regexp';

interface Aliases {
  [label: string]: string,
}

interface Route {
  id: string,
  template: string,
  aliases: Aliases
}

type GetPathParsed = (route: Route, path: string, currentLang: string ) => Match<object>
type SliceOutQueryString = (url: string) => string

export { Aliases, Route, GetPathParsed, SliceOutQueryString }