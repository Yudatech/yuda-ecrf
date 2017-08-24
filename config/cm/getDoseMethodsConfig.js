const doseMethods = [{
  value: 0,
  text: {
    zh: '口服',
    en: 'p.o.'
  }
}, {
  value: 1,
  text: {
    zh: '肌注',
    en: 'i.m.'
  }
}, {
  value: 2,
  text: {
    zh: '静注',
    en: 'i.v.'
  }
}, {
  value: 3,
  text: {
    zh: '静滴',
    en: 'iv drop'
  }
}, {
  value: 4,
  text: {
    zh: '其他',
    en: 'Other'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return doseMethods.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
