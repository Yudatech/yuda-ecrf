// 辅助检查

const labResultEvaluationConfig = [{
  value: 0,
  text: {
    zh: '正常',
    en: 'Nornal'
  }
}, {
  value: 1,
  text: {
    zh: '异常，无临床意义',
    en: 'Abnormal without clinical significancy'
  }
}, {
  value: 2,
  text: {
    zh: '异常，有临床意义',
    en: 'Abnormal with clinical significancy'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return labResultEvaluationConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};

