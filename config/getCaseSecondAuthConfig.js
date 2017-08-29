const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  formConfigs: [{
    name: 'password',
    text: {
      zh: '密码'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);

  return result;
};
