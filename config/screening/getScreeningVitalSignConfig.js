const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '体格检查',
    en: 'Clinical status'
  },
  formConfigs: [{
    name: 'vitalsign_1',
    type: 'checkbox',
    text: {
      zh: '神志清楚',
      en: 'Mentally vital'
    }
  }, {
    name: 'vitalsign_2',
    type: 'checkbox',
    text: {
      zh: '心脏杂音',
      en: 'Heart murmur'
    }
  }, {
    name: 'vitalsign_3',
    type: 'checkbox',
    text: {
      zh: '呼吸音清晰',
      en: 'Breath sound clear'
    }
  }, {
    name: 'vitalsign_4',
    type: 'select',
    optionsGetter: 'getAbdominalExamResultConfig',
    text: {
      zh: '腹部检查',
      en: 'Abdomen'
    }
  }, {
    name: 'vitalsign_5',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '脉搏 (次/分)',
      en: 'Pulse (beats/min)'
    }
  }, {
    name: 'vitalsign_6',
    type: 'checkbox',
    text: {
      zh: '肿瘤可触及',
      en: 'Tumour palpable'
    }
  }, {
    name: 'vitalsign_7_high',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血压-高压 (mmHg)',
      en: 'Systolic pressure (mmHg)'
    }
  }, {
    name: 'vitalsign_7_low',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血压-低压 (mmHg)',
      en: 'Diastolic pressure (mmHg)'
    }
  }, {
    name: 'vitalsign_8',
    type: 'checkbox',
    text: {
      zh: '肝脏可触及',
      en: 'Liver palpable'
    }
  }, {
    name: 'vitalsign_9',
    type: 'textarea',
    text: {
      zh: '其他相关情况',
      en: 'Other relevant conditions'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '请确认该患者符合入组／排除标准',
      en: 'Please make sure that the patient meets the inclusion/exclusion criteria'
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
