const typeofAnastomosis = [{
  value: 0,
  text: {
    zh: '端到端吻合',
    en: 'End-to-end anastomosis'
  }
}, {
  value: 1,
  text: {
    zh: '端侧吻合',
    en: 'End-to-side anastomosis'
  }
}, {
  value: 2,
  text: {
    zh: '并排吻合',
    en: 'Side-to-side anastomosis'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return typeofAnastomosis.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
