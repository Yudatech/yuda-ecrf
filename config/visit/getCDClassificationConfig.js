const cdClassifications = [{
  value: 0,
  text: {
    zh: 'I级',
    en: 'Grade I'
  }
}, {
  value: 1,
  text: {
    zh: 'II级',
    en: 'Grade II - V'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return cdClassifications.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
