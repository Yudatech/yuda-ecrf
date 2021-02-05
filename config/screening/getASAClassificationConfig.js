const asaClassificationConfig = [{
  value: 0,
  text: {
    zh: 'ASA1',
    en: 'ASA1'
  }
}, {
  value: 1,
  text: {
    zh: 'ASA2',
    en: 'ASA2'
  }
}, {
  value: 2,
  text: {
    zh: 'ASA3',
    en: 'ASA3'
  }
}, {
  value: 3,
  text: {
    zh: 'ASA4',
    en: 'ASA4'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return asaClassificationConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
