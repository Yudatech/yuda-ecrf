const sex = [{
  value: 0,
  text: {
    zh: '男',
    en: 'Male'
  }
}, {
  value: 1,
  text: {
    zh: '女',
    en: 'Female'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return sex.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
