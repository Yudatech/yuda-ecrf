const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '术后并发症',
    en: 'Follow-up Until Evacuation of C-REX',
  },
  formConfigs: [
    {
      name: 'postoperativeday',
      type: 'textfield',
      text: {
        zh: '术后天数',
        en: 'Postoperative day (POD)',
      },
    },
    {
      name: 'assessmentdtc',
      type: 'date',
      commit: [
        {
          rule: 'date',
          start: 'surgerydtc',
          end: 'now',
        },
      ],
      text: {
        zh: '评估日期',
        en: 'Assessment date',
      },
    },
    {
      name: 'status_1',
      type: 'checkbox',
      commit: [
        {
          rule: 'atleast_one_true',
          fields: 'status_1,status_2,status_3,status_4,status_5',
        },
      ],
      text: {
        zh: 'Pain when passing stools',
        en: 'Pain when passing stools',
      },
    },
    {
      name: 'status_2',
      type: 'checkbox',
      commit: [
        {
          rule: 'atleast_one_true',
          fields: 'status_1,status_2,status_3,status_4,status_5',
        },
      ],
      text: {
        zh: 'Reduced appetite',
        en: 'Reduced appetite',
      },
    },
    {
      name: 'status_3',
      type: 'checkbox',
      commit: [
        {
          rule: 'atleast_one_true',
          fields: 'status_1,status_2,status_3,status_4,status_5',
        },
      ],
      text: {
        zh: 'Fever and nausea',
        en: 'Fever and nausea',
      },
    },
    {
      name: 'status_4',
      type: 'checkbox',
      commit: [
        {
          rule: 'atleast_one_true',
          fields: 'status_1,status_2,status_3,status_4,status_5',
        },
      ],
      text: {
        zh: 'Abdominal pain',
        en: 'Abdominal pain',
      },
    },
    {
      name: 'status_5',
      type: 'checkbox',
      commit: [
        {
          rule: 'atleast_one_true',
          fields: 'status_1,status_2,status_3,status_4,status_5',
        },
      ],
      text: {
        zh: 'No symptoms at all',
        en: 'No symptoms at all',
      },
    },
  ],
  errors: [],
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
