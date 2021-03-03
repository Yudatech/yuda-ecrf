const clavienGradingConfig = [
  {
    value: 0,
    text: {
      zh: "No",
      en: "No",
    },
  },
  {
    value: 1,
    text: {
      zh: "2",
      en: "2",
    },
  },
  {
    value: 2,
    text: {
      zh: "3a",
      en: "3a",
    },
  },
  {
    value: 3,
    text: {
      zh: "3b",
      en: "3b",
    },
  },
  {
    value: 4,
    text: {
      zh: "4a",
      en: "4a",
    },
  },
  {
    value: 5,
    text: {
      zh: "4b",
      en: "4b",
    },
  },
  {
    value: 6,
    text: {
      zh: "(5)",
      en: "(5)",
    },
  },
];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = "en";
  }

  return clavienGradingConfig.map((item) => {
    return {
      value: item.value,
      text: item.text[lang],
    };
  });
};
