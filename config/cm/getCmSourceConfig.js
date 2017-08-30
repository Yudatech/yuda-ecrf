const cmSources = [{
  value: 0,
  text: {
    zh: '首诊',
    en: 'Visit 1 (Screening)'
  }
}, {
  value: 1,
  text: {
    zh: '复诊',
    en: 'Visit 2'
  }
}, {
  value: 2,
  text: {
    zh: '手术中',
    en: 'Operation'
  }
}, {
  value: 3,
  text: {
    zh: '手术后',
    en: 'Postoperation'
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
