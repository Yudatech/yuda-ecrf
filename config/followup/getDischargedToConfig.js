const dischargedToConfig = [{
  value: 0,
  text: {
    zh: 'Home',
    en: 'Home'
  }
}, {
  value: 1,
  text: {
    zh: 'Other care',
    en: 'Other care'
  }
}, {
  value: 2,
  text: {
    zh: 'Deceased',
    en: 'Deceased'
  }
}, {
  value: 3,
  text: {
    zh: 'Only outpatient treatment',
    en: 'Only outpatient treatment'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return dischargedToConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
