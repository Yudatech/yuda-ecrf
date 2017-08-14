const aeLevels = [{
  value: 0,
  text: {
    zh: '轻度'
  }
}, {
  value: 1,
  text: {
    zh: '中度'
  }
}, {
  value: 2,
  text: {
    zh: '严重'
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
