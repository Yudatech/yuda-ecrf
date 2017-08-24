/**
 * For visit param_3 切口感染
 */

const param3 = [{
  value: 0,
  text: {
    zh: '严重感染',
    en: 'Severe'
  }
}, {
  value: 1,
  text: {
    zh: '轻微感染',
    en: 'Mild'
  }
}, {
  value: 2,
  text: {
    zh: '无',
    en: 'No infection'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return param3.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
