const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '提交',
    en: 'Submit',
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '提交受试者数据',
        en: 'Submit data of participant',
      },
    },
    {
      name: 'subtitle_2',
      text: {
        zh: '电子签名',
        en: 'Digital Signature',
      },
    },
  ],
  empty: {
    zh: '未填写',
    en: 'Empty',
  },
  finish: {
    zh: '已完成',
    en: 'Finished',
  },
  ongoing: {
    zh: '未完成',
    en: 'Ongoing',
  },
  password: {
    zh: '密码',
    en: 'Password',
  },
  records: [
    {
      name: 'overview',
      text: {
        zh: '病例概况',
        en: 'Case Overview',
      },
      linkBase: '/overview',
    },
    {
      name: 'screening',
      total: 103,
      text: {
        zh: '首诊',
        en: 'Preoperative Screening',
      },
      linkBase: '/screening-basic',
      children: [
        {
          name: 'screening-basic',
          text: {
            zh: '人口学资料',
            en: 'Demographic data',
          },
          linkBase: '/screening-basic',
        },
        {
          name: 'screening-inclusion',
          text: {
            zh: '入选标准',
            en: 'Inclusion criteria',
          },
          linkBase: '/screening-inclusion',
        },
        {
          name: 'screening-exclusion',
          text: {
            zh: '排除标准',
            en: 'Exclusion criteria',
          },
          linkBase: '/screening-exclusion',
        },
        {
          name: 'screening-prioradiationtherapy',
          text: {
            zh: '直肠癌术前放疗',
            en: 'Preoperative radiotherapy',
          },
          linkBase: '/screening-prioradiationtherapy',
        },
        {
          name: 'screening-region',
          text: {
            zh: '病变位置',
            en: 'Location of the disease',
          },
          linkBase: '/screening-region',
        },
        {
          name: 'screening-method',
          text: {
            zh: '诊断方法',
            en: 'Examination methods',
          },
          linkBase: '/screening-method',
        },
        {
          name: 'screening-dignose',
          text: {
            zh: '临床，病理诊断及分期',
            en: 'Preoperative diagnosis',
          },
          linkBase: '/screening-dignose',
        },
      ],
    },
    {
      name: 'reviewchecklist',
      total: 4,
      text: {
        zh: '复诊',
        en: 'Prior to Surgery',
      },
      linkBase: '/reviewchecklist',
    },
    {
      name: 'surgery',
      total: 22,
      text: {
        zh: '手术',
        en: 'Surgery',
      },
      linkBase: '/surgery',
    },
    {
      name: 'visit',
      total: 28,
      text: {
        zh: '访视',
        en: 'Postoperative Assessment',
      },
      linkBase: '/visit',
    },
    {
      name: 'evacuationfollowup',
      total: 3,
      text: {
        zh: '取出植入物',
        en: 'Follow-up Until Evacuation of C-REX',
      },
      linkBase: '/evacuationfollowup',
    },
    {
      name: 'evacuation',
      total: 3,
      text: {
        zh: '取出植入物',
        en: 'Evacuation of C-REX',
      },
      linkBase: '/evacuation',
    },
    {
      text: {
        zh: '病理诊断',
        en: 'Pathological Diagnosis',
      },
      name: 'pathological',
      total: 1,
      linkBase: '/pathological',
    },
    {
      text: {
        zh: '30-days Follow-up',
        en: '30-days Follow-up',
      },
      name: 'followup',
      total: 1,
      linkBase: '/followup',
    },
    {
      name: 'ae',
      total: 13,
      text: {
        zh: '不良事件',
        en: 'Adverse Event (AE)',
      },
      linkBase: '/ae',
    },
    {
      name: 'sae',
      total: 24,
      text: {
        zh: '严重不良事件',
        en: 'Serious Adverse Event (SAE)',
      },
      linkBase: '/sae',
    },
  ],
  errorMessages: [
    {
      name: 'error_1',
      text: {
        zh: '请确认有且仅有一条短期植入吻合环排出记录',
        en: 'Please confirm there is only one evacuation of the short-term implant record.',
      },
    },
    {
      name: 'error_2',
      text: {
        zh: '知情同意书签字页未上传',
        en: 'Please confirm Uploaded Informed Consent signature page.',
      },
    },
  ],
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.records = JSON.parse(JSON.stringify(config.records));
  result.records.forEach((record) => {
    record.text = record.text[lang];
    if (record.children) {
      record.children.forEach((child) => {
        child.text = child.text[lang];
      });
    }
  });
  result.empty = config.empty[lang];
  result.finish = config.finish[lang];
  result.ongoing = config.ongoing[lang];
  result.password = config.password[lang];
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.title = config.title[lang];
  result.errorMessages = getOptionsLang(config.errorMessages, lang);

  return result;
};
