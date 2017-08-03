const anastomoticMethods = [{
  value: 0,
  text: {
    zh: '端端吻合'
  }
}, {
  value: 1,
  text: {
    zh: '侧侧吻合'
  }
}, {
  value: 2,
  text: {
    zh: '端侧吻合'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return anastomoticMethods.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
