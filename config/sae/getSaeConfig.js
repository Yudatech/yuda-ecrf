const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加严重不良事件',
    en: 'Add SAE'
  },

  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '基本信息',
        en: 'SAE Information'
      }
    },
    {
      name: 'subtitle_2',
      text: {
        zh: 'SAE 情况',
        en: 'SAE Description'
      }
    },
    {
      name: 'subtitle_3',
      text: {
        zh: 'SAE 详情',
        en: 'SAE Details'
      }
    },
    {
      name: 'subtitle_4',
      text: {
        zh: '其他',
        en: 'Others'
      },
    },
    {
      name: 'subtitle_5',
      text: {
        zh: '患者信息',
        en: 'Information of the patient'
      },
    }
  ],

  formConfigs: [{
    name: 'saeorigion',
    type: 'customselect',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '来源',
      en: 'Source'
    }
  }, {
    name: 'saeorigion_1',
    type: 'textfield',
    required: true,
    text: {
      zh: '请注明其他来源',
      en: 'Please specify other source'
    }
  }, {
    name: 'saetpe',
    type: 'select',
    optionsGetter: 'getSaeTypesConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '报告类型',
      en: 'Type of report'
    }
  }, {
    name: 'saedtc',
    type: 'datetime',
    commit: [{
      rule: 'custom_date'
    }],
    required: true,
    text: {
      zh: '报告时间',
      en: 'Time of report'
    }
  }, {
    name: 'saedeviceclass',
    type: 'select',
    optionsGetter: 'getSaeDeviceClassConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '医疗器械类别',
      en: 'Class of the medical device'
    }
  }, {
    name: 'saeindicationofsurgery',
    type: 'textfield',
    required: true,
    text: {
      zh: '手术指征',
      en: 'Indication of surgery'
    }
  }, {
    name: 'saecomoandtreatment',
    type: 'checkbox',
    text: {
      zh: '合并症和治疗',
      en: 'Comorbidity and treatment'
    }
  }, {
    name: 'saecomoandtreatment_1_diagnosis',
    type: 'textfield',
    text: {
      zh: '合并症和治疗1 - 诊断',
      en: 'Comorbidity and treatment 1 - Diagnosis'
    }
  }, {
    name: 'saecomoandtreatment_1_medication',
    type: 'textfield',
    text: {
      zh: '合并症和治疗1 - 药物',
      en: 'Comorbidity and treatment 1 - Medication'
    }
  }, {
    name: 'saecomoandtreatment_1_dose',
    type: 'textfield',
    text: {
      zh: '合并症和治疗1 - 用量',
      en: 'Comorbidity and treatment 1 - Dose'
    }
  }, {
    name: 'saecomoandtreatment_2_diagnosis',
    type: 'textfield',
    text: {
      zh: '合并症和治疗2 - 诊断',
      en: 'Comorbidity and treatment 2 - Diagnosis'
    }
  }, {
    name: 'saecomoandtreatment_2_medication',
    type: 'textfield',
    text: {
      zh: '合并症和治疗2 - 药物',
      en: 'Comorbidity and treatment 2 - Medication'
    }
  }, {
    name: 'saecomoandtreatment_2_dose',
    type: 'textfield',
    text: {
      zh: '合并症和治疗2 - 用量',
      en: 'Comorbidity and treatment 2 - Dose'
    }
  }, {
    name: 'saecomoandtreatment_3_diagnosis',
    type: 'textfield',
    text: {
      zh: '合并症和治疗3 - 诊断',
      en: 'Comorbidity and treatment 3 - Diagnosis'
    }
  }, {
    name: 'saecomoandtreatment_3_medication',
    type: 'textfield',
    text: {
      zh: '合并症和治疗3 - 药物',
      en: 'Comorbidity and treatment 3 - Medication'
    }
  }, {
    name: 'saecomoandtreatment_3_dose',
    type: 'textfield',
    text: {
      zh: '合并症和治疗3 - 用量',
      en: 'Comorbidity and treatment 3 - Dose'
    }
  }, {
    name: 'saeterm',
    type: 'textfield',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE的医学术语(诊断)',
      en: 'Medical terminology of SAE (diagnosis)'
    }
  }, {
    name: 'saeanti',
    type: 'checkbox',
    text: {
      zh: '预期的SAE',
      en: 'Anticipated SAE'
    }
  }, {
    name: 'saecaus_1',
    type: 'checkbox',
    text: {
      zh: '死亡',
      en: 'Death'
    }
  }, {
    name: 'saecaus_2',
    type: 'date',
    commit: [{
      rule: 'conditional_require',
      field: 'saecaus_1',
      value: true
    }],
    required: true,
    text: {
      zh: '死亡时间',
      en: 'Death time'
    }
  }, {
    name: 'saecaus_3',
    type: 'checkbox',
    text: {
      zh: '导致住院',
      en: 'In-patient'
    }
  }, {
    name: 'saecaus_4',
    type: 'checkbox',
    text: {
      zh: '延长住院时间',
      en: 'Prolonged hospitalization'
    }
  }, {
    name: 'saecaus_5',
    type: 'checkbox',
    text: {
      zh: '伤残',
      en: 'Disability'
    }
  }, {
    name: 'saecaus_6',
    type: 'checkbox',
    text: {
      zh: '功能障碍',
      en: 'Disfunction'
    }
  }, {
    name: 'saecaus_7',
    type: 'checkbox',
    text: {
      zh: '导致先天畸形',
      en: 'Congenital abnomality'
    }
  }, {
    name: 'saecaus_8',
    type: 'checkbox',
    text: {
      zh: '危及生命',
      en: 'Life-threatning'
    }
  }, {
    name: 'saecaus_9',
    type: 'checkbox',
    text: {
      zh: '其他',
      en: 'Others'
    }
  }, {
    name: 'saecaus_10',
    type: 'textarea',
    required: true,
    commit: [{
      rule: 'conditional_require',
      field: 'saecaus_9',
      value: true
    }],
    text: {
      zh: '其它SAE情况(填写)',
      en: 'Other (Consequence of SAE)'
    }
  }, {
    name: 'saestdtc',
    type: 'datetime',
    commit: [{
      rule: 'date',
      end: 'now'
    }],
    required: true,
    text: {
      zh: 'SAE发生时间',
      en: 'Time of onset:'
    }
  }, {
    name: 'saenoticedtc',
    type: 'datetime',
    commit: [{
      rule: 'date',
      start: 'saestdtc',
      end: 'now'
    }],
    required: true,
    text: {
      zh: '研究者获知SAE时间',
      en: 'Time for clinical investigator be informed:'
    }
  }, {
    name: 'saeact',
    type: 'select',
    optionsGetter: 'getSaeActConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '对受试器械采取的措施',
      en: 'Actions'
    }
  }, {
    name: 'saeres_1',
    type: 'select',
    optionsGetter: 'getSaeResConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE转归',
      en: 'Outcome of SAE'
    }
  }, {
    name: 'saeres_2',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_require',
      field: 'saeres_1',
      value: 0
    }],
    text: {
      zh: '有后遗症',
      en: 'Sequela'
    }
  }, {
    name: 'saerel',
    type: 'select',
    optionsGetter: 'getSaeRelConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE与受试器械的关系',
      en: 'Related to investigational device/procedure'
    }
  }, {
    name: 'saerpt_1',
    type: 'select',
    optionsGetter: 'getSaeReportConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE报道情况(国内)',
      en: 'SAE has been reported (In Sweden)'
    }
  }, {
    name: 'saerpt_2',
    type: 'select',
    optionsGetter: 'getSaeReportConfig',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE报道情况(国外)',
      en: 'SAE has been reported (In other countries)'
    }
  }, {
    name: 'saedesc',
    type: 'textarea',
    required: true,
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: 'SAE发生及处理的详细情况',
      en: 'Detailed information and treatment of SAE:'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.title = config.title[lang];

  return result;
};
