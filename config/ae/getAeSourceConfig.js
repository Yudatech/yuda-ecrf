const aeSources = [{
  value: 'surgery',
  text: {
    zh: '手术中',
    en: 'Surgery'
  }
}, {
  value: 'other',
  text: {
    zh: '其他',
    en: 'Other'
  }
}];

module.exports = function (lang, visits) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = aeSources.map((item) => {
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
