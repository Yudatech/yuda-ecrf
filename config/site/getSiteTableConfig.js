const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '临床中心列表',
    en: 'Site list'
  },
  headers: [{
    name: 'sitename',
    text: {
      zh: '临床中心名称',
      en: 'Investigation Center'
    }
  }, {
    name: 'sitetel',
    text: {
      zh: '电话',
      en: 'Tel:'
    }
  }, {
    name: 'sitemail',
    text: {
      zh: '邮件',
      en: 'email:'
    }
  }, {
    name: 'country',
    text: {
      zh: '所在国家',
      en: 'Country'
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作',
      en: 'Operations'
    }
  }],
  buttons: [{
    name: 'createNewSite',
    text: {
      zh: '新建临床中心',
      en: 'Create a new site'
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
    lang = 'en';
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
