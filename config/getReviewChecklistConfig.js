const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '复诊'
  },
  formConfigs: [{
    name: 'reviewcheck_1',
    type: 'checkbox',
    text: {
      zh: '受试者住院'
    }
  }, {
    name: 'reviewcheck_2',
    type: 'checkbox',
    text: {
      zh: '肠道清洁'
    }
  }, {
    name: 'reviewcheck_3',
    type: 'checkbox',
    text: {
      zh: '预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)'
    }
  }, {
    name: 'reviewcheck_4',
    type: 'checkbox',
    text: {
      zh: '预防性抗凝血药 (若使用抗凝血药，请完整填写《合并用药情况表》)'
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
