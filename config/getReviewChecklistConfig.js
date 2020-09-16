const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '复诊（入组）',
    en: 'Prior to Surgery',
    sv: 'Dagen före operation'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '复诊（入组）',
        en: 'The day prior to surgery'
      }
    }
  ],
  formConfigs: [{
    name: 'reviewcheckdate',
    type: 'date',
    required: true,
    commit: [{
      rule: 'date',
      start: 'subjAcceptDate',
      end: 'now'
    }],
    text: {
      zh: '复诊日期',
      en: 'Date',
      sv: 'Datum för dagen före operation'
    }
  }, {
    name: 'reviewcheck_2',
    type: 'checkbox',
    text: {
      zh: '肠道清洁',
      en: 'Full bowel cleansing',
      sv: 'Fullständig tarmregöring'
    }
  }, {
    name: 'reviewcheck_1',
    type: 'checkbox',
    text: {
      zh: '术前1周使用粪便软化剂以及术前1天使用灌肠剂',
      en: 'Stool softener 1 week prior to surgery and enema 1 day prior to surgery',
      sv: 'Bulkmedel 1 vecka före kirugi och lavemang 1 dag före kirugi'
    }
  }, {
    name: 'reviewcheck_5',
    type: 'checkbox',
    text: {
      zh: '软便-水样便',
      en: 'Loose to watery stool',
      sv: 'Lös till vattning avföring'
    }
  }, {
    name: 'reviewcheck_3',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '使用预防性抗生素',
        en: 'Prophylactic antibiotics',
        sv: 'Profylaktisk antibiotika'
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
        zh: '使用预防性抗凝血药',
        en: 'Prophylactic anti-thrombotics'
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
      zh: '请参阅PMCIP了解所需的下一步处理',
      en: 'See PMCIP for required next step',
      sv: 'se PMCIP för åtgärd'
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
