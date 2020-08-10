/**
 * For visit param_13 食物类型
 */

const foodTypes = [{
  value: 0,
  text: {
    zh: '流食',
    en: 'Liquid'
  }
}, {
  value: 1,
  text: {
    zh: '半流食',
    en: 'Semi liquid'
  }
}, {
  value: 2,
  text: {
    zh: '普食',
    en: 'Solid'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return foodTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
