const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '入选标准'
  },
  formConfigs: [{
    name: 'inclusion_1',
    type: 'checkbox',
    text: {
      zh: '年龄在18至80岁的男／女患者'
    }
  }, {
    name: 'inclusion_2',
    type: 'checkbox',
    text: {
      zh: '欲行择期手术切除左侧结肠 (降结肠、乙状结肠) 或直肠上段 (距离肛缘15cm以上)  良性或恶性病变的患者'
    }
  }, {
    name: 'inclusion_3',
    type: 'checkbox',
    text: {
      zh: '患者具有参加本试验研究的认知能力，并能理解他/她收到的关于本研究的资料'
    }
  }, {
    name: 'inclusion_4',
    type: 'checkbox',
    text: {
      zh: '签署知情同意书'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
