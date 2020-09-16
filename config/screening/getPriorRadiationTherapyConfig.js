const priorRadiationTherapyConfig = [{
  value: 0,
  text: {
    zh: '有术前放疗',
    en: 'Yes'
  }
}, {
  value: 1,
  text: {
    zh: '没有术前放疗',
    en: 'No preoperative radiotherapy'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return priorRadiationTherapyConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
