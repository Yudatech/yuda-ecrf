const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '用户列表',
    en: 'User list'
  },
  headers: [{
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
    name: 'sitename',
    text: {
      zh: '临床中心名称',
      en: 'Investigation Center'
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作',
      en: 'Operations'
    }
  }],
  buttons: [{
    name: 'createNewUser',
    text: {
      zh: '新建用户',
      en: 'Create new user'
    }
  }],
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除',
      en: 'Confirm to remove'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.headers = config.headers.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  });
  result.title = config.title[lang];
  result.buttons = getOptionsLang(config.buttons, lang);
  result.removeConfirm = getOptionsLang(config.removeConfirm, lang);

  return result;
};
