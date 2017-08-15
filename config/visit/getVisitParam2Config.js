/**
 * For visit param_2 腹部触诊
 */

const param2 = [{
  value: 0,
  text: {
    zh: '腹紧张'
  }
}, {
  value: 1,
  text: {
    zh: '腹软'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return param2.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
