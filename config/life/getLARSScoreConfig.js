const larsScore = [{
  value: 0,
  text: {
    zh: '0-20 分: 无LARS',
    en: '0-20 points: no LARS'
  }
}, {
  value: 1,
  text: {
    zh: '21-29 分: 较轻LARS',
    en: '21-29 points: minor LARS'
  }
}, {
  value: 2,
  text: {
    zh: '30-42 分: 较重LARS',
    en: '30-42 points: major LARS'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return larsScore.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
