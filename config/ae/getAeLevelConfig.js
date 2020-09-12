const aeLevels = [{
  value: 0,
  text: {
    zh: '轻度',
    en: 'Mild - discomfort which not affects normal daily activities'
  }
}, {
  value: 1,
  text: {
    zh: '中度',
    en: 'Moderate - sufficient discomfort which affects normal daily activities'
  }
}, {
  value: 2,
  text: {
    zh: '严重',
    en: 'Severe - unable to work or carry out normal daily activities'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return aeLevels.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
