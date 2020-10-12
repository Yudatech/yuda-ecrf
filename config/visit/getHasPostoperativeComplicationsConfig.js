const hasPostoperativeComplicationsConfig = [{
  value: 0,
  text: {
    zh: '是的，有术后并发症',
    en: 'Status according to Clavien-Dindo Classification, fill in grade below'
  }
}, {
  value: 1,
  text: {
    zh: '无并发症，术后病程正常',
    en: 'No complications, normal postoperative course'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return hasPostoperativeComplicationsConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
