const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加严重不良事件',
    en: 'Add SAE'
  },
  formConfigs: [{
    name: 'saeorigion',
    type: 'textfield',
    text: {
      zh: '来源'
    }
  }, {
    name: 'saetpe',
    type: 'select',
    optionsGetter: 'getSaeTypesConfig',
    text: {
      zh: '报告类型'
    }
  }, {
    name: 'saedtc',
    type: 'date',
    text: {
      zh: '报告时间'
    }
  }, {
    name: 'saeterm',
    type: 'textfield',
    text: {
      zh: 'SAE的医学术语(诊断)'
    }
  }, {
    name: 'saeanti',
    type: 'checkbox',
    text: {
      zh: 'SAE是否预期'
    }
  }, {
    name: 'saecaus_1',
    type: 'select',
    optionsGetter: 'getSaeCauseConfig',
    text: {
      zh: 'SAE情况'
    }
  }, {
    name: 'saecaus_2',
    type: 'date',
    text: {
      zh: 'SAE情况 死亡时间'
    }
  }, {
    name: 'saecaus_3',
    type: 'textarea',
    text: {
      zh: 'SAE情况 其它 (填写)'
    }
  }, {
    name: 'saestdtc',
    type: 'date',
    text: {
      zh: 'SAE发生时间'
    }
  }, {
    name: 'saenoticedtc',
    type: 'date',
    text: {
      zh: '研究者获知SAE时间'
    }
  }, {
    name: 'saeact',
    type: 'select',
    optionsGetter: 'getSaeActConfig',
    text: {
      zh: '对受试器械采取的措施'
    }
  }, {
    name: 'saeres_1',
    type: 'select',
    optionsGetter: 'getSaeResConfig',
    text: {
      zh: 'SAE转归'
    }
  }, {
    name: 'saeres_2',
    type: 'checkbox',
    text: {
      zh: 'SAE转归(后遗症)'
    }
  }, {
    name: 'saerel',
    type: 'select',
    optionsGetter: 'getSaeRelConfig',
    text: {
      zh: 'SAE与受试器械的关系'
    }
  }, {
    name: 'saerpt_1',
    type: 'select',
    optionsGetter: 'getSaeReportConfig',
    text: {
      zh: 'SAE报道情况(国内)'
    }
  }, {
    name: 'saerpt_2',
    type: 'select',
    optionsGetter: 'getSaeReportConfig',
    text: {
      zh: 'SAE报道情况(国外)'
    }
  }, {
    name: 'saedesc',
    type: 'textarea',
    text: {
      zh: 'SAE发生及处理的详细情况'
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
