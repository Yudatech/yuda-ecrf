const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加严重不良事件'
  },
  labels: [{
    name: 'saeorigion',
    text: {
      zh: '来源'
    }
  }, {
    name: 'saetpe',
    text: {
      zh: '报告类型'
    }
  }, {
    name: 'saedtc',
    text: {
      zh: '报告时间'
    }
  }, {
    name: 'saeterm',
    text: {
      zh: 'SAE的医学术语(诊断)'
    }
  }, {
    name: 'saeanti',
    text: {
      zh: 'SAE是否预期'
    }
  }, {
    name: 'saecaus_1',
    text: {
      zh: 'SAE情况'
    }
  }, {
    name: 'saecaus_2',
    text: {
      zh: 'SAE情况 死亡时间'
    }
  }, {
    name: 'saecaus_3',
    text: {
      zh: 'SAE情况 其它 (填写)'
    }
  }, {
    name: 'saestdtc',
    text: {
      zh: 'SAE发生时间'
    }
  }, {
    name: 'saenoticedtc',
    text: {
      zh: '研究者获知SAE时间'
    }
  }, {
    name: 'saeact',
    text: {
      zh: '对受试器械采取的措施'
    }
  }, {
    name: 'saeres_1',
    text: {
      zh: 'SAE转归'
    }
  }, {
    name: 'saeres_2',
    text: {
      zh: 'SAE转归(后遗症)'
    }
  }, {
    name: 'saerel',
    text: {
      zh: 'SAE与受试器械的关系'
    }
  }, {
    name: 'saerpt_1',
    text: {
      zh: 'SAE报道情况(国内)'
    }
  }, {
    name: 'saerpt_2',
    text: {
      zh: 'SAE报道情况(国外)'
    }
  }, {
    name: 'saedesc',
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
  result.labels = getOptionsLang(config.labels);
  result.title = config.title[lang];

  return result;
};
