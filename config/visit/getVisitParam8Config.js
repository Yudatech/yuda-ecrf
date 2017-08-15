/**
 * For visit param_8 肠鸣音(根据医生检查)
 */

const param8 = [{
  value: 0,
  text: {
    zh: '无'
  }
}, {
  value: 1,
  text: {
    zh: '少量'
  }
}, {
  value: 2,
  text: {
    zh: '正常'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return param8.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
