const airLeakTests = [{
  value: 0,
  text: {
    zh: '阳性',
    en: 'Positive'
  }
}, {
  value: 1,
  text: {
    zh: '阴性',
    en: 'Negative'
  }
}, {
  value: 2,
  text: {
    zh: '未进行',
    en: 'Not performed'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return airLeakTests.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
