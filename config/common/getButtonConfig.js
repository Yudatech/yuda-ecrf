const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  buttons: [{
    name: 'save',
    text: {
      zh: '保存'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
