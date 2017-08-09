const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '用户登录'
  },
  labels: [{
    name: 'userabbr',
    text: {
      zh: '姓名缩写'
    }
  }, {
    name: 'password',
    text: {
      zh: '密码'
    }
  }],
  buttons: [{
    name: 'login',
    text: {
      zh: '登录'
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
