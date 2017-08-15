/**
 * For visit param_13 食物类型
 */

const foodTypes = [{
  value: 0,
  text: {
    zh: '流食'
  }
}, {
  value: 1,
  text: {
    zh: '半流食'
  }
}, {
  value: 2,
  text: {
    zh: '普食'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return foodTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
