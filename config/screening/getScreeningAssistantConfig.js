const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '辅助检查',
    en: 'Equipment examinations'
  },
  formConfigs: [{
    name: 'assistant_1',
    type: 'select',
    optionsGetter: 'getAssistantExamResultConfig',
    text: {
      zh: '心电图',
      en: 'ECG'
    }
  }, {
    name: 'assistant_2',
    type: 'textarea',
    text: {
      zh: '心电图(异常，有临床意义),请注明',
      en: 'Abnormal with clinical significancy. Please specify:'
    }
  }, {
    name: 'assistant_3',
    type: 'select',
    optionsGetter: 'getAssistantExamResultConfig',
    text: {
      zh: '腹部B超',
      en: 'Abdominal ultrasound'
    }
  }, {
    name: 'assistant_4',
    type: 'textarea',
    text: {
      zh: '腹部B超(异常，有临床意义),请注明',
      en: 'Abnormal with Clinical Significancy. Please specify:'
    }
  }, {
    name: 'assistant_5',
    type: 'select',
    optionsGetter: 'getAssistantExamResultConfig',
    text: {
      zh: '胸部CT/胸部X线',
      en: 'Chest CT/X-ray'
    }
  }, {
    name: 'assistant_6',
    type: 'textarea',
    text: {
      zh: '胸部CT/胸部X线(异常，有临床意义),请注明',
      en: 'Abnormal with clinical significancy. Please specify:'
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
