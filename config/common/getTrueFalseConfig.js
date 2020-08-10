const config = [{
  value: true,
  text: {
    zh: '是',
    en: 'Yes'
  }
}, {
  value: false,
  text: {
    zh: '否',
    en: 'No'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return config.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
