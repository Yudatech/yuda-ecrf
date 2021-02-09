const postoperativeComplicationRequiringTreatmentConfig = [{
  value: 0,
  text: {
    zh: 'No',
    en: 'No'
  }
}, {
  value: 1,
  text: {
    zh: 'Yes, enter below Clavien grading.',
    en: 'Yes, enter below Clavien grading.'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return postoperativeComplicationRequiringTreatmentConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
