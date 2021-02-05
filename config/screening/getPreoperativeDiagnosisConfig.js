const preoperativeDiagnosisConfig = [{
  value: 0,
  text: {
    zh: '恶性',
    en: 'malign'
  }
}, {
  value: 1,
  text: {
    zh: '良性',
    en: 'benign'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return preoperativeDiagnosisConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
