const evacuationTypes = [{
  value: 0,
  text: {
    zh: '正常',
    en: 'Normal'
  }
}, {
  value: 1,
  text: {
    zh: '手动移除或手术干预',
    en: 'Manual removal or surgical intervention'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return evacuationTypes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
