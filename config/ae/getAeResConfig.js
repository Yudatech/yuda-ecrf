const aeRes = [{
  value: 1,
  text: {
    zh: '继续',
    en: 'Ongoing'
  }
}, {
  value: 2,
  text: {
    zh: '恶化',
    en: 'Deteriorate'
  }
}, {
  value: 3,
  text: {
    zh: '死亡',
    en: 'Death'
  }
}, {
  value: 4,
  text: {
    zh: '消失(有后遗症)',
    en: 'Disappear (Sequela Yes)'
  }
}, {
  value: 5,
  text: {
    zh: '消失(无后遗症)',
    en: 'Disappear (Sequela No)'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return aeRes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
