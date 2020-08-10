/**
 * For visit param_1 腹痛
 */

const param1 = [{
  value: 0,
  text: {
    zh: '重度',
    en: 'Severe'
  }
}, {
  value: 1,
  text: {
    zh: '轻度',
    en: 'Mild'
  }
}, {
  value: 2,
  text: {
    zh: '无',
    en: 'No pain'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return param1.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
