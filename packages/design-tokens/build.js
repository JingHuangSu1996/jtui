const StyleDictionary = require('style-dictionary');

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'flowCustomHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => [...defaultMessage],
});

StyleDictionary.registerFormat({
  name: 'customJSArrayFormat',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      JSON.stringify({
        name: token.path.join('-'),
        value: token.value,
        darkValue: token.darkValue,
        comment: token.comment,
        category: token.attributes.category,
      }),
    );
    return `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;
  },
});

StyleDictionary.registerFormat({
  name: 'customJSIndividualFormat',
  formatter: ({ dictionary }) =>
    StyleDictionary.format['javascript/es6']({
      dictionary,
    }),
});

function darkFormat(dictionary) {
  return dictionary.allTokens.map((token) => {
    const { darkValue } = token;
    if (darkValue) {
      return { ...token, value: token.darkValue };
    }
    return token;
  });
}

function darkFormatWrapper(format) {
  return (args) => {
    const dictionary = { ...args.dictionary };
    // Override each token's `value` with `darkValue`
    dictionary.allTokens = darkFormat(dictionary);
    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({
      ...args,
      dictionary,
    });
  };
}

StyleDictionary.registerFilter({
  name: 'customDarkColorFilter',
  matcher(token) {
    return token.darkValue && (token.attributes.category === `color` || token.attributes.category === `elevation`);
  },
});

StyleDictionary.registerFormat({
  name: 'cssDark',
  formatter: darkFormatWrapper(`css/variables`),
});

StyleDictionary.registerFormat({
  name: 'cssDarkJson',
  formatter: darkFormatWrapper(`json/flat`),
});

StyleDictionary.extend('config.json').buildAllPlatforms();
