const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '欢迎登录CREX eCRF系统',
    en: '欢迎登陆 郁达科技 产品展示网站'
  },
  labels: [{
    name: 'userabbr',
    text: {
      zh: '用户名',
      en: '用户名'
    }
  }, {
    name: 'password',
    text: {
      zh: '密码',
      en: '密码'
    }
  }],
  buttons: [{
    name: 'login',
    text: {
      zh: '登录',
      en: '登录'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.labels = getOptionsLang(config.labels, lang);
  result.title = config.title[lang];
  result.buttons = getOptionsLang(config.buttons, lang);

  return result;
};
