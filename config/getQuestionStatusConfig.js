const questionStatus = [{
  value: 0,
  text: {
    zh: '开放',
    en: 'Open'
  }
}, {
  value: 1,
  text: {
    zh: '待审核',
    en: 'Commited'
  }
}, {
  value: 2,
  text: {
    zh: '完成',
    en: 'Finished'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return questionStatus.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
