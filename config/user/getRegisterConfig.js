const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建用户',
    en: 'Create new user'
  },
  labels: [{
    name: 'username',
    text: {
      zh: '姓名',
      en: 'User name'
    }
  }, {
    name: 'userabbr',
    text: {
      zh: '姓名缩写',
      en: 'User abbreviation'
    }
  }, {
    name: 'password',
    text: {
      zh: '密码',
      en: 'Password'
    }
  }, {
    name: 'password-confirm',
    text: {
      zh: '密码确认',
      en: 'Password confirm'
    }
  }, {
    name: 'email',
    text: {
      zh: '邮件',
      en: 'Email'
    }
  }, {
    name: 'tel',
    text: {
      zh: '电话',
      en: 'Tel'
    }
  }, {
    name: 'role',
    text: {
      zh: '权限等级',
      en: 'Role'
    }
  }, {
    name: 'site',
    text: {
      zh: '临床中心',
      en: 'Investigation Center'
    }
  }, {
    name: 'language',
    text: {
      zh: '语言',
      en: 'Language'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels, lang);
  result.title = config.title[lang];

  return result;
};
