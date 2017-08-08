const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '用户列表'
  },
  headers: [{
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
    name: 'sitename',
    text: {
      zh: '临床中心名称'
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作'
    }
  }],
  buttons: [{
    name: 'createNewUser',
    text: {
      zh: '新建用户'
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
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
