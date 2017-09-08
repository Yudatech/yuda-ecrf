const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '手术',
    en: 'Operation'
  },
  groups: [{
    name: 'device',
    text: {
      zh: '器械',
      en: 'Device'
    }
  }, {
    name: 'surgery',
    text: {
      zh: '手术',
      en: 'Operation'
    }
  }],
  formConfigs: [{
    name: 'surgerydtc',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'subjAcceptDate',
      end: 'now'
    }],
    text: {
      zh: '手术日期',
      en: 'Date'
    }
  }, {
    name: 'device_1',
    type: 'select',
    optionsGetter: 'getSurgeryLapAidModelConfig',
    text: {
      zh: 'C-REX LapAid型号',
      en: 'C-REX LapAid'
    }
  }, {
    name: 'device_2',
    type: 'select',
    optionsGetter: 'getSurgeryDmhDmhcModelConfig',
    text: {
      zh: 'C-REX DMH/DMHC型号',
      en: 'C-REX DMH/DMHC'
    }
  }, {
    name: 'surgery_1',
    type: 'checkbox',
    text: {
      zh: '降结肠',
      en: 'Descending colon'
    }
  }, {
    name: 'surgery_2',
    type: 'checkbox',
    text: {
      zh: '乙状结肠',
      en: 'Sigmoid colon'
    }
  }, {
    name: 'surgery_3',
    type: 'checkbox',
    text: {
      zh: '直肠',
      en: 'Rectum'
    }
  }, {
    name: 'surgery_4',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肿瘤距离肛门(cm)',
      en: 'Distance from the anal verge'
    }
  }, {
    name: 'surgery_5',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肿瘤大小-长度(cm)'
    }
  }, {
    name: 'surgery_6',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肿瘤大小-宽度(cm)'
    }
  }, {
    name: 'surgery_7',
    type: 'textfield',
    text: {
      zh: '肿瘤浸润范围',
      en: 'Tumor involvement'
    }
  }, {
    name: 'surgery_8',
    type: 'select',
    optionsGetter: 'getSurgeryAnastomoticMethodsConfig',
    text: {
      zh: '吻合方式',
      en: 'Type of anastomosis'
    }
  }, {
    name: 'surgery_9',
    type: 'select',
    optionsGetter: 'getSurgeryMethodsConfig',
    text: {
      zh: '手术方式',
      en: 'Type of surgery'
    }
  }, {
    name: 'surgery_10',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '术中吻合口完整性压力-若使用DMHC(mbar)',
      en: 'Integrity pressure (mbar) (in case DMHC is applied)'
    }
  }, {
    name: 'surgery_11',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肛门外监测导管长度-若使用DMHC(cm)',
      en: 'Length of catheters (cm) (in case DMHC is applied)'
    }
  }, {
    name: 'surgery_12',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '手术时间(分钟)',
      en: 'Time of surgery'
    }
  }, {
    name: 'surgery_13',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '术中出血量(mL)',
      en: 'Blood lost(mL)'
    }
  }, {
    name: 'surgery_14',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '发生不良事件，请完整填写《不良事件及器械缺陷报告表》',
        en: 'Complete Adverse Events and Device Deficiency (AE) Report'
      }
    }],
    text: {
      zh: '不良事件(若发生不良事件，请完整填写《不良事件及器械缺陷报告表》)',
      en: 'Adverse events (Complete Adverse Events and Device Deficiency (AE) Report)'
    }
  }, {
    name: 'surgery_15',
    type: 'checkbox',
    text: {
      zh: '术中发现肠管直径异常或肠管壁厚度异常，例如憩室炎，慢性的肠梗阻',
      en: ''
    }
  }, {
    name: 'surgery_16',
    type: 'checkbox',
    text: {
      zh: '术中发现癌扩散',
      en: ''
    }
  }, {
    name: 'surgery_17',
    type: 'checkbox',
    text: {
      zh: '其他',
      en: 'Other'
    }
  }, {
    name: 'surgery_18',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明',
      en: 'Note reasons'
    }
  }, {
    name: 'surgery_19',
    type: 'checkbox',
    text: {
      zh: '从试验中排除',
      en: 'Excluded from the study'
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
  result.groups = getOptionsLang(config.groups, lang);

  return result;
};
