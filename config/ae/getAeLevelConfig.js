const aeLevels = [{
  value: 0,
  text: {
    zh: '轻度',
    en: 'Mild'
  }
}, {
  value: 1,
  text: {
    zh: '中度',
    en: 'Moderate'
  }
}, {
  value: 2,
  text: {
    zh: '严重',
    en: 'Severe'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return aeLevels.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
