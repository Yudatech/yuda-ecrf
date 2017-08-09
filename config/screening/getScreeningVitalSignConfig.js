const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '体格检查'
  },
  options: [{
    name: 'vitalsign_1',
    text: {
      zh: '神清'
    }
  }, {
    name: 'vitalsign_2',
    text: {
      zh: '心脏杂音'
    }
  }, {
    name: 'vitalsign_3',
    text: {
      zh: '呼吸音清晰'
    }
  }, {
    name: 'vitalsign_4',
    text: {
      zh: '腹部检查'
    }
  }, {
    name: 'vitalsign_5',
    text: {
      zh: '脉搏 (次/分)'
    }
  }, {
    name: 'vitalsign_6',
    text: {
      zh: '肿瘤可触及'
    }
  }, {
    name: 'vitalsign_7',
    text: {
      zh: '血压 (mmHg)'
    }
  }, {
    name: 'vitalsign_8',
    text: {
      zh: '肝脏可触及'
    }
  }, {
    name: 'vitalsign_9',
    text: {
      zh: '其他相关情况'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = getOptionsLang(config.options);
  result.title = config.title[lang];

  return result;
};
