const discontinuationTypes = [{
  value: 0,
  text: {
    zh: '手术前退出',
    en: 'Withdrawal before the operation'
  }
}, {
  value: 1,
  text: {
    zh: '手术中退出',
    en: 'Withdrawal during the operation'
  }
}, {
  value: 2,
  text: {
    zh: '手术后退出',
    en: 'Withdrawal after the operation'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return discontinuationTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
