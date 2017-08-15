const saeRes = [{
  value: 0,
  text: {
    zh: '症状消失'
  }
}, {
  value: 1,
  text: {
    zh: '症状持续'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeRes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
