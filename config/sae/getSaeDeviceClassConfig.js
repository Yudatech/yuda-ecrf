const saeDeviceClasses = [{
  value: 0,
  text: {
    zh: 'I',
    en: 'Class I'
  }
}, {
  value: 1,
  text: {
    zh: 'II',
    en: 'Class II'
  }
}, {
  value: 2,
  text: {
    zh: 'III',
    en: 'Class III'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeDeviceClasses.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
