const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '取出植入物',
    en: 'Follow-up and Evacuation of the Implant',
  },
  subtitles: [
    {
      name: 'subtitle_2',
      text: {
        zh: 'Evacuation of the Implant',
        en: 'Evacuation of the Implant',
      },
    },
    {
      name: 'subtitle_1',
      text: {
        zh: 'Follow-up Until Evacuation of C-REX',
        en: 'Follow-up Until Evacuation of C-REX',
      },
    },
  ],
  headers: [
    {
      name: 'postoperativeday',
      text: {
        zh: '术后天数',
        en: 'Postoperative day (POD)',
      },
    },
    {
      name: 'assessmentdtc',
      text: {
        zh: '评估日期',
        en: 'Assessment date',
      },
    },
    {
      name: 'status',
      text: {
        zh: 'Status of the patient',
        en: 'Status of the patient',
      },
    },
    {
      name: 'operations',
      text: {
        zh: '操作',
        en: 'Operations',
      },
    },
  ],
  removeConfirm: [
    {
      name: 'message',
      text: {
        zh: 'Confirm to remove follow-up',
        en: 'Confirm to remove follow-up',
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
  result.headers = config.headers.map((item) => {
    return {
      name: item.name,
      text: item.text[lang],
    };
  });
  result.removeConfirm = getOptionsLang(config.removeConfirm, lang);

  return result;
};
