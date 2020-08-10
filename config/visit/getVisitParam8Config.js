/**
 * For visit param_8 肠鸣音(根据医生检查)
 */

const param8 = [{
  value: 0,
  text: {
    zh: '无',
    en: 'Absent'
  }
}, {
  value: 1,
  text: {
    zh: '少量',
    en: 'Infrequent'
  }
}, {
  value: 2,
  text: {
    zh: '正常',
    en: 'Normal'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return param8.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
