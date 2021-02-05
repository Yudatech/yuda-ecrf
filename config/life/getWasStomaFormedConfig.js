const wasStomaFormed = [{
  value: 0,
  text: {
    zh: '无',
    en: 'No'
  }
}, {
  value: 1,
  text: {
    zh: '暂时性的',
    en: 'Temporary closed'
  }
}, {
  value: 2,
  text: {
    zh: '暂时性的',
    en: 'Temporary open'
  }
}, {
  value: 3,
  text: {
    zh: '永久性的',
    en: 'Permanent'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return wasStomaFormed.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
