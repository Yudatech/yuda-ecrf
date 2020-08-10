const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '排除标准',
    en: 'Exclusion criteria'
  },
  formConfigs: [{
    name: 'exclusion_1',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '需要手术的既往健康状况，例如肠梗阻或穿孔，局部或全身感染，腹膜炎或肠缺血。',
      en: 'Pre-existing health conditions requiring surgery, such as intestinal obstruction or perforation, local or systemic infections, peritonitis, or intestinal ischemia.'
    }
  }, {
    name: 'exclusion_2',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '不可治愈的转移性疾病（多器官转移癌）。',
      en: 'Non-curable metastatic diseases (cancer with multi-organ metastases).'
    }
  }, {
    name: 'exclusion_3',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '吻合远端的肠或肛门狭窄或其他阻塞。',
      en: 'Intestinal or anal stenosis or other obstructions distal to the anastomosis.'
    }
  }, {
    name: 'exclusion_10',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '全身麻醉禁忌症',
      en: 'Contradictions to general anaesthesia.'
    }
  }, {
    name: 'exclusion_16',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '其他外科医生认为不适宜参加本试验研究的情况',
      en: 'Other conditions which surgeons think the patient should be excluded.'
    }
  }, {
    name: 'exclusion_17',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '病人须不满足所有排除标准',
      en: 'Patient should fulfill NONE of the exclusion criteria above'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
