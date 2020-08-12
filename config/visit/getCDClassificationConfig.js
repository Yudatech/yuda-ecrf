const cdClassifications = [{
  value: 0,
  text: {
    zh: 'I级',
    en: 'Grade I'
  }
}, {
  value: 1,
  text: {
    zh: 'II级',
    en: 'Grade II'
  }
}, {
  value: 2,
  text: {
    zh: 'III级',
    en: 'Grade III'
  }
}, {
  value: 3,
  text: {
    zh: 'IV级',
    en: 'Grade IV'
  }
}, {
  value: 4,
  text: {
    zh: 'V级',
    en: 'Grade V'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return cdClassifications.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
