const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '既往史'
  },
  formConfigs: [{
    name: 'disease_1',
    type: 'checkbox',
    text: {
      zh: '饮酒'
    }
  }, {
    name: 'disease_2',
    type: 'checkbox',
    text: {
      zh: '肝硬化'
    }
  }, {
    name: 'disease_3',
    type: 'checkbox',
    text: {
      zh: '吸烟'
    }
  }, {
    name: 'disease_4',
    type: 'checkbox',
    text: {
      zh: '阻塞性肺疾患'
    }
  }, {
    name: 'disease_5',
    type: 'checkbox',
    text: {
      zh: '糖尿病'
    }
  }, {
    name: 'disease_6',
    type: 'checkbox',
    text: {
      zh: '心脏病'
    }
  }, {
    name: 'disease_7',
    type: 'checkbox',
    text: {
      zh: '较大腹部手术史'
    }
  }, {
    name: 'disease_8',
    type: 'checkbox',
    text: {
      zh: '其他疾病'
    }
  }, {
    name: 'disease_9',
    type: 'textarea',
    text: {
      zh: '其他疾病(请注明)'
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
