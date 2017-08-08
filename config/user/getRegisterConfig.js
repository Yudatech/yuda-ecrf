const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建用户'
  },
  labels: [{
    name: 'username',
    text: {
      zh: '姓名'
    }
  }, {
    name: 'userabbr',
    text: {
      zh: '姓名缩写'
    }
  }, {
    name: 'password',
    text: {
      zh: '密码'
    }
  }, {
    name: 'password-confirm',
    text: {
      zh: '密码确认'
    }
  }, {
    name: 'email',
    text: {
      zh: '邮件'
    }
  }, {
    name: 'tel',
    text: {
      zh: '电话'
    }
  }, {
    name: 'role',
    text: {
      zh: '权限等级'
    }
  }, {
    name: 'site',
    text: {
      zh: '临床中心'
    }
  }],
  buttons: [{
    name: 'saveNewUser',
    text: {
      zh: '保存'
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
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
