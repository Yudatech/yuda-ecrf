// 体格检查 -> 腹部检查

const abdominalExamResult = [{
  value: 0,
  text: {
    zh: '肥胖'
  }
}, {
  value: 1,
  text: {
    zh: '正常'
  }
}, {
  value: 2,
  text: {
    zh: '偏瘦'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return abdominalExamResult.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
