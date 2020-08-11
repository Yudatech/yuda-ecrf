const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '中途退出试验',
    en: 'Withdrawal from the study'
  },
  groups: [{
    name: 'discontinue',
    text: {
      zh: '中途退出试验',
      en: 'Withdrawal from the study'
    }
  }, {
    name: 'discontinuersn',
    text: {
      zh: '退出原因',
      en: 'Reasons for exclusion '
    }
  }],
  formConfigs: [{
    name: 'discontinuebeforesurgery',
    type: 'checkbox',
    text: {
      zh: '手术前退出',
      en: 'Exclusion/withdrawal before surgery'
    }
  }, {
    name: 'discontinuedt',
    type: 'date',
    text: {
      zh: '退出时间',
      en: 'Time of withdraw'
    }
  }, {
    name: 'discontinuersn_1',
    type: 'checkbox',
    text: {
      zh: '患者希望停止参与研究',
      en: 'The patient wishes to stop participating in the study.'
    }
  }, {
    name: 'discontinuersn_2',
    type: 'checkbox',
    text: {
      zh: '根据临床研究者的判断，不利的术中事件会给患者带来风险',
      en: 'Unfavorable intra-operative event carrying a risk to the patient, upon discretion of the clinical investigator.'
    }
  }, {
    name: 'discontinuersn_2_1',
    type: 'checkbox',
    text: {
      zh: '围手术期检测肠壁厚度和肠腔直径的极端变异。',
      en: 'Perioperative detection of extreme variants of intestinal wall thickness and intestinal lumen diameter.'
    }
  }, {
    name: 'discontinuersn_2_2',
    type: 'checkbox',
    text: {
      zh: '腹腔多处转移的围手术期检测。',
      en: 'Perioperative detection of multiple metastases in abdominal cavity.'
    }
  }, {
    name: 'discontinuersn_2_3',
    type: 'checkbox',
    text: {
      zh: '肠清洁不当，或在吻合口附近的结肠排泄粪便。',
      en: 'Improper bowel cleansing, or packed stool in colon proximal to the anastomosis.'
    }
  }, {
    name: 'discontinuersn_2_4',
    type: 'checkbox',
    text: {
      zh: '肠内循环不良。',
      en: 'Poor circulation in intestine.'
    }
  }, {
    name: 'discontinuersn_2_5',
    type: 'textarea',
    text: {
      zh: '手术期间其他不利发现，请注明',
      en: 'Other unfavorable finding during surgery, please specify.'
    }
  }, {
    name: 'discontinuersn_3',
    type: 'checkbox',
    text: {
      zh: '设备缺陷/故障/外科医生的决定。',
      en: 'Device deficiencies / malfunction / surgeon’s decision.'
    }
  }, {
    name: 'discontinuersn_3_1',
    type: 'textarea',
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }, {
    name: 'discontinuersn_4',
    type: 'checkbox',
    text: {
      zh: '不遵守规定的患者。',
      en: 'Non-compliance of patient.'
    }
  }, {
    name: 'discontinuersn_4_1',
    type: 'textarea',
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }, {
    name: 'discontinuersn_5',
    type: 'checkbox',
    text: {
      zh: '研究人员或研究人员的方案不合规',
      en: 'Protocol non-compliance of investigator or study personnel '
    }
  }, {
    name: 'discontinuersn_5_1',
    type: 'textarea',
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }, {
    name: 'discontinuersn_6',
    type: 'checkbox',
    text: {
      zh: '其他原因',
      en: 'Others'
    }
  }, {
    name: 'discontinuersn_6_1',
    type: 'textarea',
    text: {
      zh: '请注明',
      en: 'Please specify:'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.groups = getOptionsLang(config.groups, lang);
  result.title = config.title[lang];

  return result;
};
