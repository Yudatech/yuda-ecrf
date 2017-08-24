/**
 * For visit param_14 拔除胃管 and param_15 拔除腹部引流
 */

const param14 = [{
  value: 0,
  text: {
    zh: '是',
    en: 'Yes'
  }
}, {
  value: 1,
  text: {
    zh: '否',
    en: 'No'
  }
}, {
  value: 2,
  text: {
    zh: '不适用',
    en: 'NA'
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
