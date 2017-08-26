const discontinuationTypes = [{
  value: 0,
  text: {
    zh: '手术前退出',
    en: ''
  }
}, {
  value: 1,
  text: {
    zh: '手术中退出',
    en: ''
  }
}, {
  value: 2,
  text: {
    zh: '手术后退出',
    en: ''
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return discontinuationTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
