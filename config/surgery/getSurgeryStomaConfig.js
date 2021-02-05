const stomaConfig = [{
  value: 0,
  text: {
    zh: '临时造口',
    en: 'Temporary stoma'
  }
}, {
  value: 1,
  text: {
    zh: '永久造口',
    en: 'Permanent stoma'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return stomaConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
