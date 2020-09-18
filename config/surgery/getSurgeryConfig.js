const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '手术',
    en: 'Surgery'
  },

  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '肠切除部位',
        en: 'Surgical Area'
      }
    }
  ],

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
      en: 'Surgical procedure'
    }
  }],
  formConfigs: [{
    name: 'surgerydtc',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'reviewcheckdate',
      end: 'now'
    }],
    text: {
      zh: '手术日期',
      en: 'Date'
    }
  }, {
    name: 'device_1',
    type: 'select',
    optionsGetter: 'getSurgeryDeviceTypeConfig',
    text: {
      zh: '设备型号',
      en: 'Type of device'
    }
  }, {
    name: 'device_2',
    type: 'select',
    optionsGetter: 'getSurgeryDeviceSizeConfig',
    text: {
      zh: '设备尺寸',
      en: 'Size of device'
    }
  }, {
    name: 'surgery_1',
    type: 'checkbox',
    text: {
      zh: '盲肠',
      en: 'Cecum'
    }
  }, {
    name: 'surgery_2',
    type: 'checkbox',
    text: {
      zh: '升结肠',
      en: 'Ascending colon'
    }
  }, {
    name: 'surgery_3',
    type: 'checkbox',
    text: {
      zh: '横结肠',
      en: 'Transverse colon'
    }
  }, {
    name: 'surgery_4',
    type: 'checkbox',
    text: {
      zh: '降结肠',
      en: 'Descending colon'
    }
  }, {
    name: 'surgery_5',
    type: 'checkbox',
    text: {
      zh: '乙状结肠',
      en: 'Sigmoid colon'
    }
  }, {
    name: 'surgery_6',
    type: 'checkbox',
    text: {
      zh: '直肠上段 (距离肛缘11-15cm以上)',
      en: 'Upper rectum (15 cm above the anal verge)'
    }
  }, {
    name: 'surgery_16',
    type: 'checkbox',
    text: {
      zh: '直肠下段',
      en: 'Lower rectum (up to 15 cm above the anal verge)'
    }
  }, {
    name: 'surgery_8',
    type: 'select',
    optionsGetter: 'getAirLeakTestConfig',
    text: {
      zh: '漏气测试',
      en: 'Air leak test'
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
    name: 'surgery_15',
    type: 'select',
    optionsGetter: 'getTypeOfAnastomosisConfig',
    text: {
      zh: '吻合类型',
      en: 'Type of anastomosis'
    }
  }, {
    name: 'surgery_10',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '术中吻合口完整性压力(mbar)',
      en: 'C-REX integrity pressure test (mbar) (optional)'
    }
  }, {
    name: 'surgery_11',
    type: 'checkbox',
    text: {
      zh: 'C-REX真空泵完整性检查',
      en: 'C-REX vacuum pump integrity check'
    }
  }, {
    name: 'surgery_12',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '手术时间(分钟)',
      en: 'Time of surgery (minutes)'
    }
  }, {
    name: 'surgery_13',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '术中出血量 (mL)',
      en: 'Blood lost (mL)'
    }
  }, {
    name: 'surgery_14',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '请完整填写《不良事件及器械缺陷报告表》',
        en: 'Complete Adverse Events and Device Deficiency (AE) Report'
      }
    }],
    text: {
      zh: '不良事件(请完整填写《不良事件及器械缺陷报告表》)',
      en: 'Adverse events (Complete Adverse Events (AE) and Device Deficiency Report)'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '请完整填写《不良事件及器械缺陷报告表》',
      en: 'Complete Adverse Events and Device Deficiency (AE) Report, please'
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
  result.groups = getOptionsLang(config.groups, lang);
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
