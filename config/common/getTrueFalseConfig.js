const config = [{
  value: true,
  text: {
    zh: '是',
    en: 'True'
  }
}, {
  value: false,
  text: {
    zh: '否',
    en: 'False'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return config.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
