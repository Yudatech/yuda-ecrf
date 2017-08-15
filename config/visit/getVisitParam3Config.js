/**
 * For visit param_3 切口感染
 */

const param3 = [{
  value: 0,
  text: {
    zh: '严重感染'
  }
}, {
  value: 1,
  text: {
    zh: '轻微感染'
  }
}, {
  value: 2,
  text: {
    zh: '无'
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
