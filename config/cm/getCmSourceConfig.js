const cmSources = [{
  value: 'visit1',
  text: {
    zh: '首诊',
    en: 'Visit 1 (Screening)'
  }
}, {
  value: 'visit2',
  text: {
    zh: '复诊',
    en: 'Visit 2'
  }
}];

module.exports = function (lang, visits) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = cmSources.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });

  visits.forEach((item) => {
    result.push({
      value: item._id.toString(),
      text: item.postoperativedayText
    });
  });

  return result;
};
