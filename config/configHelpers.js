exports.getOptionsLang = function(options, lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  options.map((item) => {
    const itemCopy = Object.assign({}, item);
    itemCopy.text = item.text[lang];
    return itemCopy;
  }).forEach((item) => {
    result[item.name] = item;
  });
  return result;
};
