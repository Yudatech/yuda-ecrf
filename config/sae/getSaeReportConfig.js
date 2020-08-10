const saeReports = [{
  value: 0,
  text: {
    zh: '有',
    en: 'Yes'
  }
}, {
  value: 1,
  text: {
    zh: '无',
    en: 'No'
  }
}, {
  value: 2,
  text: {
    zh: '不详',
    en: 'Unknow'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return saeReports.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
