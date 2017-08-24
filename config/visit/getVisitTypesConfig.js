/**
 * For visit visittype 访视方式
 */

const param14 = [{
  value: 0,
  text: {
    zh: '病房',
    en: 'Patient'
  }
}, {
  value: 1,
  text: {
    zh: '电话',
    en: 'Telephone interview'
  }
}, {
  value: 2,
  text: {
    zh: '门诊',
    en: 'Outpatient'
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
