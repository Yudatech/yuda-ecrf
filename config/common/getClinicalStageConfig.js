// 临床、病理诊断及分期 -> 床分期

const clinicalStages = [{
  value: 0,
  text: {
    zh: 'I',
    en: 'I'
  }
}, {
  value: 1,
  text: {
    zh: 'II',
    en: 'II'
  }
}, {
  value: 2,
  text: {
    zh: 'III',
    en: 'III'
  }
}, {
  value: 3,
  text: {
    zh: 'IV',
    en: 'IV'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return clinicalStages.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
