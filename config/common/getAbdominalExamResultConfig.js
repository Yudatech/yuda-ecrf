// 体格检查 -> 腹部检查

const abdominalExamResult = [{
  value: 0,
  text: {
    zh: '肥胖',
    en: 'Fat'
  }
}, {
  value: 1,
  text: {
    zh: '正常',
    en: 'Normal'
  }
}, {
  value: 2,
  text: {
    zh: '偏瘦',
    en: 'Skinny'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return abdominalExamResult.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
