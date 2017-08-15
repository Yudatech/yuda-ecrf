/**
 * For visit visittype 访视方式
 */

const param14 = [{
  value: 0,
  text: {
    zh: '病房'
  }
}, {
  value: 1,
  text: {
    zh: '电话'
  }
}, {
  value: 2,
  text: {
    zh: '门诊'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return param14.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
