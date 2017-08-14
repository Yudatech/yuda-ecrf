const aeRes = [{
  value: 0,
  text: {
    zh: '消失'
  }
}, {
  value: 1,
  text: {
    zh: '继续'
  }
}, {
  value: 2,
  text: {
    zh: '恶化'
  }
}, {
  value: 3,
  text: {
    zh: '死亡'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return aeRes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
