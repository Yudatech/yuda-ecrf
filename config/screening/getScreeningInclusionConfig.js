const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '首诊(筛选)',
    en: 'Preoperative Screening'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '入选标准',
        en: 'Inclusion criteria'
      }
    }
  ],
  formConfigs: [{
    name: 'inclusion_1',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '年龄在18以上的男／女患者',
      en: 'Male or female age ≥ 18 years.'
    }
  }, {
    name: 'inclusion_2',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '欲行择期手术切除左侧结肠直肠上段良性或恶性病变的患者',
      en: 'Planned resection due to benign or malign disease in the left colon or the rectum.'
    }
  }, {
    name: 'inclusion_3',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '患者具有参加本试验研究的认知能力，能理解他/她收到的关于本研究的资料并提供所需许可文件',
      en: 'Cognitive ability to take part in the study，to understand the information the patient receives about participating in the study and to provide informed consent.'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '病人须符合所有入选标准',
      en: 'Patient should fulfill ALL inclusion criteria above.'
    }
  }]
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
