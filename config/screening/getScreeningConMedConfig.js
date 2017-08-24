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
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
