// 实验室检查 -> 临床评估

const labResultEvaluationConfig = [{
  value: 0,
  text: {
    zh: '正常值 (在正常值范围以内)'
  }
}, {
  value: 1,
  text: {
    zh: '异常，但无临床意义'
  }
}, {
  value: 2,
  text: {
    zh: '异常，并有临床意义'
  }
}, {
  value: 3,
  text: {
    zh: '未进行检查'
  }
}, {
  value: 4,
  text: {
    zh: '所得到的检查结果不可靠 (技术或分析上的原因)'
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

