// 辅助检查

const labResultEvaluationConfig = [{
  value: 0,
  text: {
    zh: '正常'
  }
}, {
  value: 1,
  text: {
    zh: '异常，无临床意义'
  }
}, {
  value: 2,
  text: {
    zh: '异常，有临床意义'
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

