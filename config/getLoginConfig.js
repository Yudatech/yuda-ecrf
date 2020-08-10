const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '欢迎登录CREX eCRF系统',
    en: 'Welcome to CREX eCRF system'
  },
  labels: [{
    name: 'userabbr',
    text: {
      zh: '用户名',
      en: 'Username'
    }
  }, {
    name: 'password',
    text: {
      zh: '密码',
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

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels, lang);
  result.title = config.title[lang];
  result.buttons = getOptionsLang(config.buttons, lang);

  return result;
};
