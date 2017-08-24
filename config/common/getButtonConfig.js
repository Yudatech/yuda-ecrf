const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  buttons: [{
    name: 'save',
    text: {
      zh: '保存',
      en: 'Save'
    }
  }, {
    name: 'add',
    text: {
      zh: '添加',
      en: 'Add'
    }
  }, {
    name: 'committed',
    text: {
      zh: '已提交',
      en: 'Committed'
    }
  }, {
    name: 'ongoing',
    text: {
      zh: '待完成',
      en: 'Ongoing'
    }
  }, {
    name: 'all',
    text: {
      zh: '全部',
      en: 'All'
    }
  }, {
    name: 'commit',
    text: {
      zh: '提交',
      en: 'Commit'
    }
  }, {
    name: 'publish',
    text: {
      zh: '发布',
      en: 'Publish'
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
