const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '合并用药情况'
  },
  options: [{
    name: 'conmed_1',
    text: {
      zh: '抗生素'
    }
  }, {
    name: 'conmed_2',
    text: {
      zh: '抗凝血剂'
    }
  }, {
    name: 'conmed_3',
    text: {
      zh: '止痛药'
    }
  }, {
    name: 'conmed_4',
    text: {
      zh: '激素药物'
    }
  }, {
    name: 'conmed_5',
    text: {
      zh: '其他药物'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = getOptionsLang(config.options);
  result.title = config.title[lang];

  return result;
};
