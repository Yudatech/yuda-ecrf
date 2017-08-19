const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加不良事件'
  },
  formConfigs: [{
    name: 'aeorigion',
    type: 'textfield',
    text: {
      zh: '来源'
    }
  }, {
    name: 'event',
    type: 'textfield',
    text: {
      zh: '事件 (名称及症状)'
    }
  }, {
    name: 'aestdtc',
    type: 'datetime',
    text: {
      zh: '发生时间'
    }
  }, {
    name: 'aeeddtc',
    type: 'datetime',
    text: {
      zh: '结束时间'
    }
  }, {
    name: 'aeserv',
    type: 'select',
    optionsGetter: 'getAeLevelConfig',
    text: {
      zh: '严重程度'
    }
  }, {
    name: 'aeact',
    type: 'checkbox',
    text: {
      zh: '采取措施'
    }
  }, {
    name: 'aerpt',
    type: 'checkbox',
    text: {
      zh: '报告'
    }
  }, {
    name: 'aerel',
    type: 'select',
    optionsGetter: 'getAeRelConfig',
    text: {
      zh: '与试验器械和/或试验操作的关系'
    }
  }, {
    name: 'aeres_1',
    type: 'select',
    optionsGetter: 'getAeResConfig',
    text: {
      zh: '转归'
    }
  }, {
    name: 'aeres_2',
    type: 'checkbox',
    text: {
      zh: '转归后遗症'
    }
  }, {
    name: 'aesae',
    type: 'checkbox',
    text: {
      zh: 'SAE'
    }
  }, {
    name: 'aedevicedft',
    type: 'checkbox',
    text: {
      zh: '器械缺陷'
    }
  }, {
    name: 'aediscon',
    type: 'checkbox',
    text: {
      zh: '因该事件退出试验'
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
