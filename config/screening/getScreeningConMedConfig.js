const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '合并用药情况',
    en: 'Concomitant medication'
  },
  formConfigs: [{
    name: 'conmed_1',
    type: 'checkbox',
    text: {
      zh: '抗生素',
      en: 'Antibiotics'
    }
  }, {
    name: 'conmed_2',
    type: 'checkbox',
    text: {
      zh: '抗凝血剂',
      en: 'Anticoagulant'
    }
  }, {
    name: 'conmed_3',
    type: 'checkbox',
    text: {
      zh: '止痛药',
      en: 'Analgesics'
    }
  }, {
    name: 'conmed_4',
    type: 'checkbox',
    text: {
      zh: '激素药物',
      en: 'Steroid'
    }
  }, {
    name: 'conmed_5',
    type: 'checkbox',
    text: {
      zh: '其他药物',
      en: 'Other medication'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '请确认该患者符合入组／排除标准',
      en: ''
    }
  }, {
    name: 'error_2',
    text: {
      zh: '请完整填写《合并用药情况表》',
      en: ''
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
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
