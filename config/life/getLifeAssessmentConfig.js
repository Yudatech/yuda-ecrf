const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '生活质量和医疗利用模式评估',
    en: 'Life quality and healthcare utilization pattern assessment'
  },

  groups: [{
    name: 'life',
    text: {
      zh: '生活质量',
      en: 'Quality of life assessment'
    }
  }, {
    name: 'healthcare',
    text: {
      zh: '医疗利用模式评估',
      en: 'Healthcare utilization pattern assessment'
    }
  }, {
    name: 'procedure',
    text: {
      zh: '执行以下步骤',
      en: 'The following procedures were performed'
    }
  }, {
    name: 'complications',
    text: {
      zh: '根据Clavien-Dindo分类的并发症总数',
      en: 'Total number of complications according to Clavien-Dindo classification'
    }
  }],
  formConfigs: [{
    name: 'assessmentdtc',
    type: 'date',
    text: {
      zh: '评估日期',
      en: 'Date'
    }
  }, {
    name: 'life_1',
    type: 'select',
    optionsGetter: 'getLARSScoreConfig',
    text: {
      zh: '12个月LARS评分',
      en: 'LARS score 12 months'
    }
  }, {
    name: 'healthcare_1',
    type: 'checkbox',
    text: {
      zh: '在过去的12个月中，该患者是否已重新住院',
      en: 'Has the patient been readmitted to hospital in the past 12 months'
    }
  }, {
    name: 'healthcare_1_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '总住院天数',
      en: 'Total number of days of stay'
    }
  }, {
    name: 'healthcare_2',
    type: 'checkbox',
    text: {
      zh: '患者是否因外科手术并发症而接受了外科手术',
      en: 'Has the patient undergone resurgery in relation to surgical complications'
    }
  }, {
    name: 'healthcare_2_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '手术次数',
      en: 'Number of resurgeries'
    }
  }, {
    name: 'healthcare_2_2',
    type: 'select',
    optionsGetter: 'getWasStomaFormedConfig',
    required: true,
    text: {
      zh: '形成气孔',
      en: 'Was stoma formed'
    }
  }, {
    name: 'healthcare_3',
    type: 'checkbox',
    text: {
      zh: '在过去的12个月中，患者是否曾就外科并发症去过门诊诊所',
      en: 'Has the patient visited outpatient clinic in the past 12 months in relation to surgical complications'
    }
  }, {
    name: 'healthcare_3_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '就诊次数',
      en: 'Number of visits'
    }
  }, {
    name: 'healthcare_4',
    type: 'checkbox',
    text: {
      zh: '患者是否接受过与手术并发症有关的任何药物治疗',
      en: 'Has the patient received any pharmacological treatment in relation to surgical complications'
    }
  }, {
    name: 'healthcare_4_1',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明诊断药理剂，剂量方案，持续时间',
      en: 'Please specify diagnosis pharmacological agent, dose regimen, duration'
    }
  }, {
    name: 'procedure_1',
    type: 'checkbox',
    text: {
      zh: 'X射线',
      en: 'X-ray'
    }
  }, {
    name: 'procedure_1_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'X射线次数',
      en: 'Times of X-ray'
    }
  }, {
    name: 'procedure_2',
    type: 'checkbox',
    text: {
      zh: 'CT',
      en: 'CT'
    }
  }, {
    name: 'procedure_2_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'CT次数',
      en: 'Times of CT'
    }
  }, {
    name: 'procedure_3',
    type: 'checkbox',
    text: {
      zh: 'MRI',
      en: 'MRI'
    }
  }, {
    name: 'procedure_3_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'MRI次数',
      en: 'Times of MRI'
    }
  }, {
    name: 'procedure_4',
    type: 'checkbox',
    text: {
      zh: '内镜检查',
      en: 'Endoscopy'
    }
  }, {
    name: 'procedure_4_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: '内镜检查次数',
      en: 'Times of Endoscopy'
    }
  }, {
    name: 'complications_1',
    type: 'checkbox',
    text: {
      zh: 'I级并发症',
      en: 'Grade I complications'
    }
  }, {
    name: 'complications_1_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'I级并发症总数',
      en: 'Total number of Grade I complications'
    }
  }, {
    name: 'complications_2',
    type: 'checkbox',
    text: {
      zh: 'II级并发症',
      en: 'Grade II complications'
    }
  }, {
    name: 'complications_2_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'II级并发症总数',
      en: 'Total number of Grade II complications'
    }
  }, {
    name: 'complications_3',
    type: 'checkbox',
    text: {
      zh: 'III级并发症',
      en: 'Grade III complications'
    }
  }, {
    name: 'complications_3_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'III级并发症总数',
      en: 'Total number of Grade III complications'
    }
  }, {
    name: 'complications_4',
    type: 'checkbox',
    text: {
      zh: 'IV级并发症',
      en: 'Grade IV'
    }
  }, {
    name: 'complications_4_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'IV级并发症总数',
      en: 'Total number of Grade IV complications'
    }
  }, {
    name: 'complications_5',
    type: 'checkbox',
    text: {
      zh: 'V级并发症',
      en: 'Grade V'
    }
  }, {
    name: 'complications_5_1',
    type: 'numberfield',
    required: true,
    text: {
      zh: 'V级并发症总数',
      en: 'Total number of Grade V complications'
    }
  }],
  errors: []
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.groups = getOptionsLang(config.groups, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
