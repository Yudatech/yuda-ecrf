const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '既往史',
    en: 'Anamnesis'
  },
  formConfigs: [{
    name: 'disease_1',
    type: 'checkbox',
    text: {
      zh: '饮酒',
      en: 'Alcohol use'
    }
  }, {
    name: 'disease_2',
    type: 'checkbox',
    text: {
      zh: '肝硬化',
      en: 'Liver cirrhosis'
    }
  }, {
    name: 'disease_3',
    type: 'checkbox',
    text: {
      zh: '吸烟',
      en: 'Smoking'
    }
  }, {
    name: 'disease_4',
    type: 'checkbox',
    text: {
      zh: '阻塞性肺疾患',
      en: 'Obstructive lung disease'
    }
  }, {
    name: 'disease_5',
    type: 'checkbox',
    text: {
      zh: '糖尿病',
      en: 'Diabetes mellitus'
    }
  }, {
    name: 'disease_6',
    type: 'checkbox',
    text: {
      zh: '心脏病',
      en: 'Heart disease'
    }
  }, {
    name: 'disease_7',
    type: 'checkbox',
    text: {
      zh: '较大腹部手术史',
      en: 'Earlier major abdominal surgery'
    }
  }, {
    name: 'disease_8',
    type: 'checkbox',
    text: {
      zh: '其他疾病',
      en: 'Other comorbidities'
    }
  }, {
    name: 'disease_9',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明',
      en: 'please specify:'
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
