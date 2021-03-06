const saeRes = [{
  value: 0,
  text: {
    zh: '症状消失',
    en: 'Disappeared/Healed'
  }
}, {
  value: 1,
  text: {
    zh: '症状持续',
    en: 'Ongoing'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return saeRes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
