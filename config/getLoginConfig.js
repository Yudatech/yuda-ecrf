const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '用户登录',
    en: 'login'
  },
  labels: [{
    name: 'userabbr',
    text: {
      zh: '姓名缩写',
      en: 'User abbreviation'
    }
  }, {
    name: 'password',
    text: {
      zh: '登录密码',
      en: 'Password'
    }
  }],
  buttons: [{
    name: 'login',
    text: {
      zh: '登录',
      en: 'Login'
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
