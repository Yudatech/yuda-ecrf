const anastomoticMethods = [{
  value: 0,
  text: {
    zh: '端端吻合'，
    en: 'End-to-end'
  }
}, {
  value: 1,
  text: {
    zh: '侧侧吻合',
    en: 'Side-to-Side'
  }
}, {
  value: 2,
  text: {
    zh: '端侧吻合',
    en: 'End-to-side'
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
