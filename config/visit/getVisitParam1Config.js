/**
 * For visit param_1 腹痛
 */

const param1 = [{
  value: 0,
  text: {
    zh: '重度'
  }
}, {
  value: 1,
  text: {
    zh: '轻度'
  }
}, {
  value: 2,
  text: {
    zh: '无'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return param1.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
