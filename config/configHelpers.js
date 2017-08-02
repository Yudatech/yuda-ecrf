exports.getOptionsLang = function(options, lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  options.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  }).forEach((item) => {
    result[item.name] = {
      text: item.text
    };
  });
  return result;
};
