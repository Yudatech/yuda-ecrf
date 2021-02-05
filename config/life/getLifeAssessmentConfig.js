const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '生活质量和医疗利用模式评估',
    en: 'Life Quality and Healthcare Utilization Pattern Assessment (12 months after surgery)'
  },

  groups: [{
    name: 'life',
    text: {
      zh: '生活质量',
      en: 'Quality of life assessment'
    }
  }, {
    name: 'healthcare',
    text: {
      zh: '医疗利用模式评估',
      en: 'Healthcare utilization pattern assessment'
    }
  }, {
    name: 'complications',
    text: {
      zh: '根据Clavien-Dindo分类的并发症总数',
      en: 'Total number of complications according to Clavien-Dindo classification'
    }
  }],
  formConfigs: [{
    name: 'assessmentdtc',
    type: 'date',
    text: {
      zh: '评估日期',
      en: 'Date'
    }
  }, {
    name: 'life_1',
    type: 'select',
    optionsGetter: 'getLARSScoreConfig',
    text: {
      zh: '12个月LARS评分',
      en: 'LARS score 12 months'
    }
  }, {
    name: 'healthcare_1',
    type: 'checkbox',
    text: {
      zh: '在过去的12个月中，该患者是否已重新住院',
      en: 'The patient has been readmitted to hospital in the past 12 months related to surgical complications'
    }
  }, {
    name: 'healthcare_1_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '总住院天数',
      en: 'Total number of days of hospitalization'
    }
  }, {
    name: 'healthcare_2',
    type: 'checkbox',
    text: {
      zh: '患者是否因外科手术并发症而接受了外科手术',
      en: 'The patient has undergone resurgery related to surgical complications'
    }
  }, {
    name: 'healthcare_2_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '手术次数',
      en: 'Number of resurgeries'
    }
  }, {
    name: 'healthcare_2_2',
    type: 'select',
    optionsGetter: 'getWasStomaFormedConfig',
    required: true,
    text: {
      zh: '形成气孔',
      en: 'Stoma was formed'
    }
  }, {
    name: 'healthcare_2_3',
    type: 'textarea',
    required: true,
    text: {
      zh: '造口的原因',
      en: 'Reason for stoma'
    }
  }, {
    name: 'healthcare_3',
    type: 'checkbox',
    text: {
      zh: '在过去的12个月中，患者是否曾就外科并发症去过门诊诊所',
      en: 'The patient has visited outpatient clinics in the past 12 months related to surgical complications'
    }
  }, {
    name: 'healthcare_3_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '就诊次数',
      en: 'Number of visits'
    }
  }],
  errors: []
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.groups = getOptionsLang(config.groups, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
