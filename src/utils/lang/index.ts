const getPatternSupportedLangs = (langs: string[]) => {
  const supportedLangs = langs.reduce((acc, e, i) => {
    if (i + 1 === langs.length) {
      return acc + e;
    }

    return acc + e + '|';
  }, '');

  return `/:lang(${supportedLangs})`;
};

export { getPatternSupportedLangs };