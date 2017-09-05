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

const template = {
  zh: '术后第__DAYNUM__天第__NUM__次访视',
  en: '__DAYNUM__ days the __NUM__ visit after Operation'
};

module.exports = function(lang, visits) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const templateLang = template[lang];

  const result = cmSources.map((item) => {
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
