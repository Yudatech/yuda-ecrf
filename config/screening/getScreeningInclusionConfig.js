const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '入选标准',
    en: 'Inclusion criteria'
  },
  formConfigs: [{
    name: 'inclusion_1',
    type: 'checkbox',
    required: true,
    text: {
      zh: '年龄在18至80岁的男／女患者',
      en: 'Male or female age ≥ 18 years and ≤ 80 years'
    }
  }, {
    name: 'inclusion_2',
    type: 'checkbox',
    required: true,
    text: {
      zh: '欲行择期手术切除左侧结肠 (降结肠、乙状结肠) 或直肠上段 (距离肛缘15cm以上)  良性或恶性病变的患者',
      en: 'Planned resection due to benign or malign disease in the left colon (descending colon and sigmoid) or the upper rectum (15 cm above the anal rim).'
    }
  }, {
    name: 'inclusion_3',
    type: 'checkbox',
    required: true,
    text: {
      zh: '患者具有参加本试验研究的认知能力，并能理解他/她收到的关于本研究的资料',
      en: 'Cognitive ability to take part in the study and understand the information he/she receives about participating in the study.'
    }
  }, {
    name: 'inclusion_4',
    type: 'checkbox',
    required: true,
    text: {
      zh: '签署知情同意书',
      en: 'Sign the informed consent form.'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
