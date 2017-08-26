const cmSources = [{
  value: 0,
  text: {
    zh: '首诊',
    en: ''
  }
}, {
  value: 1,
  text: {
    zh: '手术中',
    en: ''
  }
}, {
  value: 2,
  text: {
    zh: '手术后',
    en: ''
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return cmSources.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
