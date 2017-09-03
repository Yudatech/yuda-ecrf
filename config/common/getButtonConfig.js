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
      zh: '待审核',
      en: 'Committed'
    }
  }, {
    name: 'ongoing',
    text: {
      zh: '进行中',
      en: 'Ongoing'
    }
  }, {
    name: 'audited',
    text: {
      zh: '已审核',
      en: 'Audited'
    }
  }, {
    name: 'locked',
    text: {
      zh: '已完成',
      en: 'Completed'
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
      en: 'Discontinue'
    }
  }, {
    name: 'lock',
    text: {
      zh: '锁定',
      en: 'Lock'
    }
  }, {
    name: 'cancel',
    text: {
      zh: '取消',
      en: 'Cancel'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.buttons = getOptionsLang(config.buttons, lang);

  return result;
};
