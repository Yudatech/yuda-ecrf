const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
    formConfigs: [{
      name: 'password',
      text: {
        zh: '密码',
        en: 'Password'
      }
    }],
    title: {
      zh: '审核',
      en: 'Audit'
    },
    subtitle:
      {
        zh: '电子签名',
        en: 'Digital Signature'
      }
  }
;

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.subtitle = config.subtitle[lang];
  return result;
};
