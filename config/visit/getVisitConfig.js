const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '术后并发症',
    en: 'Postoperative Assessment'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '术后过程/并发症/出院评估',
        en: 'Postoperative course/complications/discharge assessment'
      }
    }, {
      name: 'subtitle_2',
      text: {
        zh: 'Infectious',
        en: 'Infectious'
      }
    }, {
      name: 'subtitle_3',
      text: {
        zh: 'Cardiovascular',
        en: 'Cardiovascular'
      }
    }, {
      name: 'subtitle_4',
      text: {
        zh: 'Neurological',
        en: 'Neurological'
      }
    }, {
      name: 'subtitle_5',
      text: {
        zh: 'Surgical',
        en: 'Surgical'
      }
    }
  ],
  formConfigs: [{
    name: 'postoperativeday',
    type: 'textfield',
    text: {
      zh: '术后天数',
      en: 'Postoperative day (POD)'
    }
  }, {
    name: 'assessmentdtc',
    type: 'date',
    commit: [{
      rule: 'date',
      start: 'surgerydtc',
      end: 'now'
    }],
    text: {
      zh: '评估日期',
      en: 'Assessment date'
    }
  }, {
    name: 'postoperative_1',
    type: 'checkbox',
    text: {
      zh: '出院评估',
      en: 'Discharge assessment'
    }
  }, {
    name: 'postoperative_2',
    type: 'select',
    commit: [{
      rule: 'required'
    }],
    optionsGetter: 'getHasPostoperativeComplicationsConfig',
    text: {
      zh: '有术后并发症',
      en: 'Postoperative status'
    }
  }, {
    name: 'postoperative_2_1',
    type: 'select',
    required: true,
    optionsGetter: 'getCDClassificationConfig',
    commit: [{
      rule: 'custom',
      message: {
        zh: '请完整填写《不良事件及器械缺陷报告表》',
        en: 'Complete Adverse Events and Device Deficiency (AE) Report'
      }
    }],
    text: {
      zh: 'Clavien-Dindo分类',
      en: 'Clavien-Dindo Classification'
    }
  }, {
    name: 'postoperative_2_1_1',
    type: 'select',
    required: true,
    optionsGetter: 'getPostoperativeComplicationRequiringTreatmentConfig',
    commit: [{
      rule: 'conditional_require',
      field: 'postoperative_2_1',
      value: 1
    }],
    text: {
      zh: '术后并发症需要治疗',
      en: 'Postoperative complication requiring treatment'
    }
  }, {
    name: 'postoperative_2_1_2',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Pneumonia',
      en: 'Pneumonia'
    }
  }, {
    name: 'postoperative_2_1_3',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Sepsis',
      en: 'Sepsis'
    }
  }, {
    name: 'postoperative_2_1_4',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'postoperative_2_1_5',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Cardial infarction',
      en: 'Cardial infarction'
    }
  }, {
    name: 'postoperative_2_1_6',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Heart failure',
      en: 'Heart failure'
    }
  }, {
    name: 'postoperative_2_1_7',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Arhythmia',
      en: 'Arhythmia'
    }
  }, {
    name: 'postoperative_2_1_8',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Deep vein thrombosis',
      en: 'Deep vein thrombosis'
    }
  }, {
    name: 'postoperative_2_1_9',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'postoperative_2_1_10',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'CVI',
      en: 'CVI'
    }
  }, {
    name: 'postoperative_2_1_11',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'postoperative_2_1_12',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Wound infection',
      en: 'Wound infection'
    }
  }, {
    name: 'postoperative_2_1_13',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Intraabdominal infection',
      en: 'Intraabdominal infection'
    }
  }, {
    name: 'postoperative_2_1_14',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Bleeding',
      en: 'Bleeding'
    }
  }, {
    name: 'postoperative_2_1_15',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Wound rupture',
      en: 'Wound rupture'
    }
  }, {
    name: 'postoperative_2_1_16',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Anastomosis insufficiency',
      en: 'Anastomosis insufficiency'
    }
  }, {
    name: 'postoperative_2_1_17',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Stoma complication',
      en: 'Stoma complication'
    }
  }, {
    name: 'postoperative_2_1_18',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'postoperative_2_1',
      conditionValue: 1,
      fields: 'postoperative_2_1_2,postoperative_2_1_3,postoperative_2_1_4,postoperative_2_1_5,postoperative_2_1_6,postoperative_2_1_7,postoperative_2_1_8,postoperative_2_1_9,postoperative_2_1_10,postoperative_2_1_11,postoperative_2_1_12,postoperative_2_1_13,postoperative_2_1_14,postoperative_2_1_15,postoperative_2_1_16,postoperative_2_1_17,postoperative_2_1_18'
    }],
    text: {
      zh: 'Other complications',
      en: 'Other complications'
    }
  }, {
    name: 'postoperative_2_1_18_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require_multiple_values',
      field: 'postoperative_2_1_18',
      values: [1, 2, 3, 4, 5, 6]
    }],
    text: {
      zh: 'Specify',
      en: 'Specify'
    }
  }, {
    name: 'postoperative_2_1_19',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'conditional_require',
      field: 'postoperative_2_1',
      value: true,
    }],
    text: {
      zh: '出院时导尿管',
      en: 'Urinary catheter at discharge'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '请完整填写《不良事件及器械缺陷报告表》',
      en: 'Complete Adverse Events (AE) and Device Deficiency Report.'
    }
  }, {
    name: 'error_2',
    text: {
      zh: '请完整填写《严重不良事件及器械缺陷报告表》',
      en: 'Complete both Adverse Events (AE) and Serious Adverse Events (SAE) Reports.'
    }
  }]
};

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
