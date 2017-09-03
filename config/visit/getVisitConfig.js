const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加访视',
    en: 'Add postoperative visit'
  },
  subtitles: [{
    name: 'subtitle_1',
    text: {
      zh: '访视信息',
      en: 'Visit Information'
    }
  }, {
    name: 'subtitle_2',
    text: {
      zh: '腹部检查',
      en: 'Abdominal Examination'
    }
  }, {
    name: 'subtitle_3',
    text: {
      zh: '血常规检查(必要时)',
      en: 'Blood Tests (if necessary)'
    }
  }, {
    name: 'subtitle_4',
    text: {
      zh: '体温',
      en: 'Temperature'
    }
  }, {
    name: 'subtitle_5',
    text: {
      zh: '肠鸣音(根据医生检查)',
      en: 'Bowel sounds according to the surgeon'
    }
  }, {
    name: 'subtitle_6',
    text: {
      zh: '肠功能恢复情况(根据受试者感受)',
      en: 'Bowel function according to the participant'
    }
  }, {
    name: 'subtitle_7',
    text: {
      zh: '进食',
      en: 'Eating'
    }
  }, {
    name: 'subtitle_8',
    text: {
      zh: '恢复',
      en: 'Recovery'
    }
  }, {
    name: 'subtitle_9',
    text: {
      zh: '其他检查（必要时）',
      en: 'Other examinations (if necessary)'
    }
  }, {
    name: 'subtitle_10',
    text: {
      zh: '合并用药',
      en: 'Concomitant Medication'
    }
  }, {
    name: 'subtitle_11',
    text: {
      zh: '排出',
      en: 'Implant'
    }
  }, {
    name: 'subtitle_12',
    text: {
      zh: '不良事件',
      en: 'Adverse Events'
    }
  }],
  formConfigs: [{
    name: 'visitnum',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '当天第n次访视',
      en: 'Patient rounds no. of the day'
    }
  }, {
    name: 'visitdtc',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'surgerydtc',
      end: 'now'
    }],
    text: {
      zh: '访视日期',
      en: 'Visit date'
    }
  }, {
    name: 'visittype',
    type: 'select',
    optionsGetter: 'getVisitTypesConfig',
    text: {
      zh: '访视方式',
      en: 'Type of visit'
    }
  }, {
    name: 'visitreason',
    type: 'textfield',
    text: {
      zh: '计划外访视原因',
      en: 'Reason for extra visit'
    }
  }, {
    name: 'visittreat',
    type: 'textfield',
    text: {
      zh: '处理/治疗',
      en: 'Treatment'
    }
  }, {
    name: 'visitres',
    type: 'select',
    optionsGetter: 'getVisitResConfig',
    text: {
      zh: '转归',
      en: 'Outcome'
    }
  }, {
    name: 'param_1',
    type: 'select',
    optionsGetter: 'getVisitParam1Config',
    text: {
      zh: '腹痛',
      en: 'Abdominal pain'
    }
  }, {
    name: 'param_2',
    type: 'select',
    optionsGetter: 'getVisitParam2Config',
    text: {
      zh: '腹部触诊',
      en: 'Abdominal pain during palpation'
    }
  }, {
    name: 'param_3',
    type: 'select',
    optionsGetter: 'getVisitParam3Config',
    text: {
      zh: '切口感染',
      en: 'Infection of the incision'
    }
  }, {
    name: 'param_4',
    type: 'checkbox',
    text: {
      zh: '是',
      en: 'Yes'
    }
  }, {
    name: 'param_5',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血红蛋白 (Hb)',
      en: 'Hgb'
    }
  }, {
    name: 'param_6',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白细胞 (WBC)',
      en: 'WBC'
    }
  }, {
    name: 'param_7',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '体温(°C)',
      en: 'Temperature (°C)'
    }
  }, {
    name: 'param_8',
    type: 'select',
    optionsGetter: 'getVisitParam8Config',
    text: {
      zh: '肠鸣音',
      en: 'Bowel sounds'
    }
  }, {
    name: 'param_9',
    type: 'checkbox',
    text: {
      zh: '肠鸣音',
      en: 'Bowel function'
    }
  }, {
    name: 'param_10',
    type: 'checkbox',
    text: {
      zh: '排气',
      en: 'Passage of gas'
    }
  }, {
    name: 'param_11',
    type: 'checkbox',
    text: {
      zh: '排便',
      en: 'Passage of feces'
    }
  }, {
    name: 'param_12',
    type: 'checkbox',
    text: {
      zh: '是',
      en: 'Yes'
    }
  }, {
    name: 'param_13',
    type: 'select',
    optionsGetter: 'getVisitFoodTypesConfig',
    text: {
      zh: '食物类型',
      en: 'Type of food'
    }
  }, {
    name: 'param_14',
    type: 'select',
    optionsGetter: 'getVisitParam14Config',
    text: {
      zh: '拔除胃管',
      en: 'Remove of gastric tubing'
    }
  }, {
    name: 'param_15',
    type: 'select',
    optionsGetter: 'getVisitParam14Config',
    text: {
      zh: '拔除腹部引流',
      en: 'Abdominal drainages'
    }
  }, {
    name: 'param_16',
    type: 'checkbox',
    text: {
      zh: '有',
      en: 'Yes'
    }
  }, {
    name: 'param_17',
    type: 'textarea',
    required: true,
    text: {
      zh: '请说明',
      en: 'Please specify.'
    }
  }, {
    name: 'param_18',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '使用药物，请完整填写《合并用药情况表》',
        en: 'Complete Cocomitant Medication Report, please.'
      }
    }],
    text: {
      zh: '是（若使用药物，请完整填写《合并用药情况表》）',
      en: 'Yes (Complete Cocomitant Medication Report, please.'
    }
  }, {
    name: 'param_19',
    type: 'checkbox',
    commit: [{
      rule: 'only_once',
      value: true
    }],
    text: {
      zh: '短期植入吻合环排出',
      en: 'Evacuation of the short-term implant'
    }
  }, {
    name: 'param_20',
    type: 'checkbox',
    text: {
      zh: '自然排出',
      en: 'Normal'
    }
  }, {
    name: 'param_21',
    type: 'checkbox',
    text: {
      zh: '人工取出或经外科操作取出',
      en: 'Manual evacuation or surgical intervention'
    }
  }, {
    name: 'param_22',
    type: 'checkbox',
    commit: [{
      rule: 'custom',
      message: {
        zh: '发生不良事件，请完整填写《不良事件及器械缺陷报告表》',
        en: 'Complete Adverse Events and Device Deficiency (AE) Report'
      }
    }],
    text: {
      zh: '是（发生不良事件，请完整填写《不良事件及器械缺陷报告表》）',
      en: 'Yes（Complete Adverse Events and Device Deficiency (AE) Report）'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
