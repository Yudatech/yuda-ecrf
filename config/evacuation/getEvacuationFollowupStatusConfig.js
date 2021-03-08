const config = [
  {
    value: 1,
    text: {
      zh: 'Has symptoms',
      en: 'Has symptoms',
    },
  },
  {
    value: 0,
    text: {
      zh: 'No symptoms at all',
      en: 'No symptoms at all',
    },
  },
];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return config.map((item) => {
    return {
      value: item.value,
      text: item.text[lang],
    };
  });
};
