import { GetPathParsed, SliceOutQueryString } from './types';
import { match as createMatcher } from 'path-to-regexp';

const getPathParsed: GetPathParsed = (route, path, currentLang) => {
  const match = createMatcher(route.aliases[currentLang]);

  return match(path);
};

const sliceOutQueryString: SliceOutQueryString = (url) => {
  const indexOfQuestionMark = url.indexOf("?");

  if (indexOfQuestionMark >= 0) {
    return url.substring(0, indexOfQuestionMark)
  }

  return url
};

export { getPathParsed, sliceOutQueryString }