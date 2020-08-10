const saeRels = [{
  value: 0,
  text: {
    zh: '肯定有关',
    en: 'Definitely yes'
  }
}, {
  value: 1,
  text: {
    zh: '可能有关',
    en: 'Possibly yes'
  }
}, {
  value: 2,
  text: {
    zh: '有关',
    en: 'Yes'
  }
}, {
  value: 3,
  text: {
    zh: '可能无关',
    en: 'Possibly no'
  }
}, {
  value: 4,
  text: {
    zh: '无关',
    en: 'No'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return saeRels.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
