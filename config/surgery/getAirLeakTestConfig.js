const airLeakTests = [{
  value: 0,
  text: {
    zh: '已进行',
    en: 'Performed'
  }
}, {
  value: 1,
  text: {
    zh: '未进行',
    en: 'Not performed'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return airLeakTests.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
