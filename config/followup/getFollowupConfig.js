const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '30 days follow-up',
    en: '30 days follow-up'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: 'Postoperative complications (within the care session or within 30 days after the operation)',
        en: 'Postoperative complications (within the care session or within 30 days after the operation)'
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
    name: 'followup_1',
    type: 'select',
    required: true,
    optionsGetter: 'getPostoperativeComplicationRequiringTreatmentConfig',
    commit: [{
      rule: 'required'
    }],
    text: {
      zh: '术后并发症需要治疗',
      en: 'Postoperative complication requiring treatment'
    }
  }, {
    name: 'followup_2',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Pneumonia',
      en: 'Pneumonia'
    }
  }, {
    name: 'followup_3',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Sepsis',
      en: 'Sepsis'
    }
  }, {
    name: 'followup_4',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_5',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Cardial infarction',
      en: 'Cardial infarction'
    }
  }, {
    name: 'followup_6',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Heart failure',
      en: 'Heart failure'
    }
  }, {
    name: 'followup_7',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Arhythmia',
      en: 'Arhythmia'
    }
  }, {
    name: 'followup_8',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Deep vein thrombosis',
      en: 'Deep vein thrombosis'
    }
  }, {
    name: 'followup_9',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_10',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'CVI',
      en: 'CVI'
    }
  }, {
    name: 'followup_11',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_12',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_13',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_14',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_15',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_16',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_17',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other',
      en: 'Other'
    }
  }, {
    name: 'followup_18',
    type: 'radio',
    optionsGetter: 'getClavienGradingConfig',
    commit: [{
      rule: 'atleast_one',
      fields: 'followup_2,followup_3,followup_4,followup_5,followup_6,followup_7,followup_8,followup_9,followup_10,followup_11,followup_12,followup_13,followup_14,followup_15,followup_16,followup_17,followup_18'
    }],
    text: {
      zh: 'Other complications',
      en: 'Other complications'
    }
  }, {
    name: 'followup_18_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_18',
      values: [1, 2, 3, 4, 5, 6]
    }],
    text: {
      zh: 'Specify',
      en: 'Specify'
    }
  }, {
    name: 'followup_19',
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
  }, {
    name: 'followup_20',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'IVA care',
      en: 'IVA care'
    }
  }, {
    name: 'followup_20_1',
    type: 'date',
    commit: [{
      rule: 'condition_require',
      field: 'followup_20',
      value: 1
    }],
    text: {
      zh: 'In, date',
      en: 'In, date'
    }
  }, {
    name: 'followup_20_2',
    type: 'date',
    commit: [{
      rule: 'condition_require',
      field: 'followup_20',
      value: 1
    }],
    text: {
      zh: 'Out, date',
      en: 'Out, date'
    }
  }, {
    name: 'followup_21',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Re-surgery',
      en: 'Re-surgery'
    }
  }, {
    name: 'followup_21_1',
    type: 'date',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_1,followup_21_2,followup_21_3,followup_21_4'
    }],
    text: {
      zh: 'Date re-surgery 1',
      en: 'Date re-surgery 1'
    }
  }, {
    name: 'followup_21_2',
    type: 'date',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_1,followup_21_2,followup_21_3,followup_21_4'
    }],
    text: {
      zh: 'Date re-surgery 2',
      en: 'Date re-surgery 2'
    }
  }, {
    name: 'followup_21_3',
    type: 'date',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_1,followup_21_2,followup_21_3,followup_21_4'
    }],
    text: {
      zh: 'Date re-surgery 3',
      en: 'Date re-surgery 3'
    }
  }, {
    name: 'followup_21_4',
    type: 'date',
    commit: [{
      rule: 'conditional_atleast_one',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_1,followup_21_2,followup_21_3,followup_21_4'
    }],
    text: {
      zh: 'Date re-surgery 4',
      en: 'Date re-surgery 4'
    }
  }, {
    name: 'followup_21_5_1',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_5_1,followup_21_5_2,followup_21_5_3,followup_21_5_4',
    }],
    text: {
      zh: 'Wound rupture',
      en: 'Wound rupture'
    }
  }, {
    name: 'followup_21_5_2',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_5_1,followup_21_5_2,followup_21_5_3,followup_21_5_4',
    }],
    text: {
      zh: 'Bleeding Infection',
      en: 'Bleeding Infection'
    }
  }, {
    name: 'followup_21_5_3',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_5_1,followup_21_5_2,followup_21_5_3,followup_21_5_4',
    }],
    text: {
      zh: 'Anastomosis insufficiency',
      en: 'Anastomosis insufficiency'
    }
  }, {
    name: 'followup_21_5_4',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_21',
      conditionValue: 1,
      fields: 'followup_21_5_1,followup_21_5_2,followup_21_5_3,followup_21_5_4',
    }],
    text: {
      zh: 'Other causes',
      en: 'Other causes'
    }
  }, {
    name: 'followup_21_5_4_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_21_5_4',
      value: true
    }],
    text: {
      zh: 'Specify',
      en: 'Specify'
    }
  }, {
    name: 'followup_22',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Scheduled readmission',
      en: 'Scheduled readmission'
    }
  }, {
    name: 'followup_22_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_22',
      value: 1
    }],
    text: {
      zh: 'Cause(s)',
      en: 'Cause(s)'
    }
  }, {
    name: 'followup_23',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Death within 30 days postop',
      en: 'Death within 30 days postop'
    }
  }, {
    name: 'followup_23_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_23',
      value: 1
    }],
    text: {
      zh: 'Cause of death:',
      en: 'Cause of death:'
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
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
