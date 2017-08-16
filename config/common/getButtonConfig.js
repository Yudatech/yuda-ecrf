const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  buttons: [{
    name: 'save',
    text: {
      zh: '保存'
    }
  }, {
    name: 'add',
    text: {
      zh: '添加'
    }
  }, {
    name: 'committed',
    text: {
      zh: '已提交'
    }
  }, {
    name: 'ongoing',
    text: {
      zh: '待完成'
    }
  }, {
    name: 'all',
    text: {
      zh: '全部'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
