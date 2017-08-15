const saeTypes = [{
  value: 0,
  text: {
    zh: '首次报告'
  }
}, {
  value: 1,
  text: {
    zh: '随访报告'
  }
}, {
  value: 2,
  text: {
    zh: '总结报告'
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
