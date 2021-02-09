const config = [{
  value: 1,
  text: {
    zh: '是',
    en: 'Yes'
  }
}, {
  value: 0,
  text: {
    zh: '否',
    en: 'No'
  }
}, {
  value: 2,
  text: {
    zh: 'I do not know',
    en: 'I do not know'
  }
}];

module.exports = function (lang) {
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
