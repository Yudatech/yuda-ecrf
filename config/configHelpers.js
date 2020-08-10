exports.getOptionsLang = function (options, lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  options.map((item) => {
    const itemCopy = JSON.parse(JSON.stringify(item));
    itemCopy.text = item.text[lang];
    if (itemCopy.commit) {
      itemCopy.commit.forEach((commitItem) => {
        if (commitItem.message) {
          commitItem.message = commitItem.message[lang];
        }
      });
    }
    return itemCopy;
  }).forEach((item) => {
    result[item.name] = item;
  });
  return result;
};
