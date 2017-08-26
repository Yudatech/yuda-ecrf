const aeSources = [{
  value: 'surgery',
  text: {
    zh: '手术中',
    en: ''
  }
}];

const template = {
  zh: '术后第__DAYNUM__天第__NUM__次访视',
  en: ''
};

module.exports = function(lang, visits) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const templateLang = template[lang];

  const result = aeSources.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });

  visits.forEach((item) => {
    let text = templateLang.replace('__DAYNUM__', item.days);
    text = text.replace('__NUM__', item.visitnum);
    result.push({
      value: item._id.toString(),
      text
    });
  });

  return result;
};
