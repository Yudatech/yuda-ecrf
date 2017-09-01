const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '首诊清单',
    en: 'Checklist for Visit 1'
  },
  formConfigs: [{
    name: 'screeningcheckdate',
    type: 'date',
    text: {
      zh: '日期',
      en: 'Date'
    }
  }, {
    name: 'screeningcheck_1',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '根据标准入选/排除，在病例报告表中登记',
      en: 'Inclusion / Exclusion. To be registered in the CRF.'
    }
  }, {
    name: 'screeningcheck_2',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '向患者口头告知本试验研究信息，演示C-REX LapAid和C-REX DMH/DMHC',
      en: 'Oral information about the study. C-REX LapAid and C-REX DMH/DMHC are demonstrated.'
    }
  }, {
    name: 'screeningcheck_3',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '向患者提供本试验研究的书面资料',
      en: 'Provide the patient with written information about the study.'
    }
  }, {
    name: 'screeningcheck_4',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '患者在知情同意书上签字',
      en: 'The patient signs the Informed Consent Form.'
    }
  }, {
    name: 'screeningcheck_5',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '在病例报告表中登记受试者人口学资料',
      en: 'Demographic data is recorded in the CRF.'
    }
  }, {
    name: 'screeningcheck_6',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '在病例报告表中记录受试者病史',
      en: 'Medical history of the patient is recorded in the CRF.'
    }
  }, {
    name: 'screeningcheck_7',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '在病例报告表中记录受试者合并用药情况',
      en: 'Current medication treatment is recorded in the CRF.'
    }
  }, {
    name: 'screeningcheck_8',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '向受试者下医嘱行术前肠道清洁',
      en: 'Prescription for pre-operative bowel cleansing is provided.'
    }
  }, {
    name: 'screeningcheck_9',
    type: 'checkbox',
    requireTrueValue: true,
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '诊断方法、结果记录在病例报告中。',
      en: 'Methods of diagnosis. The result is registered in the CRF.'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
