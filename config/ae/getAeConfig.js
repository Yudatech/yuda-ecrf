const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加不良事件',
    en: 'add AE'
  },
  formConfigs: [{
    name: 'aeorigion',
    type: 'textfield',
    text: {
      zh: '来源',
      en: 'source'
    }
  }, {
    name: 'event',
    type: 'textfield',
    text: {
      zh: '事件 (名称及症状)',
      en: 'Event'
    }
  }, {
    name: 'aestdtc',
    type: 'datetime',
    text: {
      zh: '发生时间',
      en: 'Date of onset'
    }
  }, {
    name: 'aeeddtc',
    type: 'datetime',
    text: {
      zh: '结束时间',
      en: 'Date of stop'
    }
  }, {
    name: 'aeserv',
    type: 'select',
    optionsGetter: 'getAeLevelConfig',
    text: {
      zh: '严重程度',
      en: 'Severity'
    }
  }, {
    name: 'aeact',
    type: 'checkbox',
    text: {
      zh: '采取措施',
      en: 'Actions taken'
    }
  }, {
    name: 'aerpt',
    type: 'checkbox',
    text: {
      zh: '报告',
      en: 'Report'
    }
  }, {
    name: 'aerel',
    type: 'select',
    optionsGetter: 'getAeRelConfig',
    text: {
      zh: '与试验器械和/或试验操作的关系',
      en: 'Related to investigational device/procedure'
    }
  }, {
    name: 'aeres_1',
    type: 'select',
    optionsGetter: 'getAeResConfig',
    text: {
      zh: '转归',
      en: 'Outcome'
    }
  }, {
    name: 'aeres_2',
    type: 'checkbox',
    text: {
      zh: '转归后遗症',
      en: 'Sequela'
    }
  }, {
    name: 'aesae',
    type: 'checkbox',
    text: {
      zh: 'SAE',
      en: 'SAE'
    }
  }, {
    name: 'aedevicedft',
    type: 'checkbox',
    text: {
      zh: '器械缺陷',
      en: 'Device deficiency'
    }
  }, {
    name: 'aediscon',
    type: 'checkbox',
    text: {
      zh: '因该事件退出试验',
      en: 'Withdrawal from the study'
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
