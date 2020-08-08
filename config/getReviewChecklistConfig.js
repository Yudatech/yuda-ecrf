const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '复诊（入组）',
    en: 'Day prior to surgery'
  },
  formConfigs: [{
    name: 'reviewcheckdate',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'subjAcceptDate',
      end: 'now'
    }],
    text: {
      zh: '复诊日期',
      en: 'Visit 2 Date'
    }
  }, {
    name: 'reviewcheck_2',
    type: 'checkbox',
    text: {
      zh: '肠道清洁',
      en: 'Full bowel cleansing'
    }
  }, {
    name: 'reviewcheck_1',
    type: 'checkbox',
    text: {
      zh: '手术前1周的粪便软化剂和手术前1天的灌肠剂',
      en: 'Stool softener 1 week prior to surgery and enema 1 day prior to surgery'
    }
  }, {
    name: 'reviewcheck_5',
    type: 'checkbox',
    text: {
      zh: '粪便松软',
      en: 'Loose to watery stool'
    }
  }, {
    name: 'reviewcheck_3',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '已使用抗生素，请完整填写《合并用药情况表》',
        en: 'Complete Concomitant Medication Report, please.'
      }
    }],
    text: {
      zh: '预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)',
      en: 'Prophylactic Antibiotics (Complete Concomitant Medication Report, please.)'
    }
  }, {
    name: 'reviewcheck_4',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '已使用抗凝血药，请完整填写《合并用药情况表》',
        en: 'Complete Concomitant Medication Report, please.'
      }
    }],
    text: {
      zh: '预防性抗凝血药 (若使用抗凝血药，请完整填写《合并用药情况表》)',
      en: 'Prophylactic Anti-Thrombotic (Complete Concomitant Medication Report, please.)'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '依据研究方案，受试者在术前应进行肠道清洁',
      en: 'Provide prescription for pre-operative bowel cleansing, please.'
    }
  }, {
    name: 'error_2',
    text: {
      zh: '若使用抗生素，请完整填写《合并用药情况表》',
      en: 'Complete Concomitant Medication Report, please'
    }
  }, {
    name: 'error_3',
    text: {
      zh: '若使用抗凝血药，请完整填写《合并用药情况表》',
      en: 'Complete Concomitant Medication Report, please'
    }
  }, {
    name: 'error_4',
    text: {
      zh: '请参阅PMCIP了解所需的下一步',
      en: 'See PMCIP for required next step'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
