const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '取出植入物',
    en: 'Follow-up and Evacuation of the Implant',
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: 'Evacuation of the Implant',
        en: 'Evacuation of the Implant',
      },
    },
  ],
  formConfigs: [
    {
      name: 'evacuationdtc',
      type: 'date',
      commit: [
        {
          rule: 'required',
        },
        {
          rule: 'date',
          start: 'surgerydtc',
          end: 'now',
        },
      ],
      text: {
        zh: '取出日期',
        en: 'Date of evacuation',
      },
    },
    {
      name: 'evacuationtype',
      type: 'select',
      optionsGetter: 'getEvacuationTypesConfig',
      commit: [
        {
          rule: 'required',
        },
      ],
      text: {
        zh: '取出方式',
        en: 'Evacuation',
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
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
