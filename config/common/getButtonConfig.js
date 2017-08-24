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
  }, {
    name: 'audit',
    text: {
      zh: '审核',
      en: 'Audit'
    }
  }, {
    name: 'quit',
    text: {
      zh: '中途退出',
      en: 'discontinue'
    }
  }, {
    name: 'lock',
    text: {
      zh: '锁定',
      en: 'Lock'
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
