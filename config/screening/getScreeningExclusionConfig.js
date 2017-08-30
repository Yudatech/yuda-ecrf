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
      zh: '当前病情需要紧急救护',
      en: 'Urgent medical conditions requiring emergency care.'
    }
  }, {
    name: 'exclusion_2',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '当前外科情况为肠梗阻或肠穿孔，局部或全身感染、腹膜炎、小肠局部缺血或者严重癌转移',
      en: 'Current surgical conditions, such as intestinal obstruction or perforation, local or systemic infections, peritonitis, intestinal ischemia or severe dissemination (metastases) of cancer.'
    }
  }, {
    name: 'exclusion_3',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '肛管狭窄或存在其他可致肛管梗阻的情况',
      en: 'Stenosis or other obstructions in the anal passage.'
    }
  }, {
    name: 'exclusion_4',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '既往有较大腹部手术病史，既往腹部或盆腔的放射治疗',
      en: 'Previous major abdominal surgery, earlier radiation therapy to organs in abdomen or pelvis.'
    }
  }, {
    name: 'exclusion_5',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: 'ASA III - VI',
      en: 'Health condition classified as ASA III-VI.'
    }
  }, {
    name: 'exclusion_6',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '白蛋白低于35 g/l',
      en: 'Albumin levels lower than 35 g/l.'
    }
  }, {
    name: 'exclusion_7',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '炎性肠病(溃疡性结肠炎或克罗恩病)',
      en: 'Inflammatory bowel disease (ulcerative colitis or Crohn´s disease).'
    }
  }, {
    name: 'exclusion_8',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '病情需要两处或以上肠吻合',
      en: 'Disease that requires more than one intestinal anastomosis.'
    }
  }, {
    name: 'exclusion_9',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '术前一个月内使用过皮质激素、免疫抑制剂',
      en: 'Treatment with cortisone, immunosuppressive medications, and/or chemotherapy less than one month before surgery.'
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
    name: 'exclusion_11',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '术前或术中发现肠管直径异常或肠壁厚度异常',
      en: 'Perioperative detection of extreme variants of intestinal diameters or wall thickness.'
    }
  }, {
    name: 'exclusion_12',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '因认知能力所限，不能理解与试验研究相关的资料，不能了解试验研究的目的和设计，或患者不同意参加本试验',
      en: 'Cognitive ability that limits the patient’s ability to take part in the study and understand the information he/she received about participating in the study, or the patient does not agree to join the study.'
    }
  }, {
    name: 'exclusion_13',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: 'BMI > 35',
      en: 'BMI > 35'
    }
  }, {
    name: 'exclusion_14',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '术前六个月内发生过心肌梗死或其他严重心脏疾病',
      en: 'Heart attack ≤ 6 months or severe heart disease.'
    }
  }, {
    name: 'exclusion_15',
    type: 'checkbox',
    requireFalseValue: true,
    commit: [{
      rule: 'must_false'
    }],
    text: {
      zh: '严重凝血方面疾病',
      en: 'Severe embolic disease.'
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
      en: 'Reasons:'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs  = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
