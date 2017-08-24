const saeTypes = [{
  value: 0,
  text: {
    zh: '首次报告',
    en: 'Initial report'
  }
}, {
  value: 1,
  text: {
    zh: '随访报告',
    en: 'Follow-up report'
  }
}, {
  value: 2,
  text: {
    zh: '总结报告',
    en: 'Summary report'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
