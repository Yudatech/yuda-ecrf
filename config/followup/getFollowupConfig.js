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
    }, {
      name: 'subtitle_6',
      text: {
        zh: 'Continued planning/treatment',
        en: 'Continued planning/treatment'
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
  }, {
    name: 'followup_24',
    type: 'select',
    required: true,
    optionsGetter: 'getDischargedToConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Discharged to',
      en: 'Discharged to'
    }
  }, {
    name: 'followup_25',
    type: 'date',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Discharged date',
      en: 'Discharged date'
    }
  }, {
    name: 'followup_26',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Remote metastasis diagnosed',
      en: 'Remote metastasis diagnosed'
    }
  }, {
    name: 'followup_26_1',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Liver',
      en: 'Liver'
    }
  }, {
    name: 'followup_26_2',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Lung',
      en: 'Lung'
    }
  }, {
    name: 'followup_26_3',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Pleura',
      en: 'Pleura'
    }
  }, {
    name: 'followup_26_4',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Peritoneum',
      en: 'Peritoneum'
    }
  }, {
    name: 'followup_26_5',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Ovarian',
      en: 'Ovarian'
    }
  }, {
    name: 'followup_26_6',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'lymph nodes paraaortic / central abdomen',
      en: 'lymph nodes paraaortic / central abdomen'
    }
  }, {
    name: 'followup_26_7',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Lymph nodes groin / lower extremity',
      en: 'Lymph nodes groin / lower extremity'
    }
  }, {
    name: 'followup_26_8',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Lymph nodes supraclavian / upper extremity',
      en: 'Lymph nodes supraclavian / upper extremity'
    }
  }, {
    name: 'followup_26_9',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Lymph nodes intrathoracic',
      en: 'Lymph nodes intrathoracic'
    }
  }, {
    name: 'followup_26_10',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Lymph nodes in pelvis',
      en: 'Lymph nodes in pelvis'
    }
  }, {
    name: 'followup_26_11',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Skeletal',
      en: 'Skeletal'
    }
  }, {
    name: 'followup_26_12',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Adrenal Gland',
      en: 'Adrenal Gland'
    }
  }, {
    name: 'followup_26_13',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'CNS',
      en: 'CNS'
    }
  }, {
    name: 'followup_26_14',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_26',
      conditionValue: 1,
      fields: 'followup_26_1,followup_26_2,followup_26_3,followup_26_4,followup_26_5,followup_26_6,followup_26_7,followup_26_8,followup_26_9,followup_26_10,followup_26_11,followup_26_12,followup_26_13,followup_26_14',
    }],
    text: {
      zh: 'Other organs',
      en: 'Other organs'
    }
  }, {
    name: 'followup_26_14_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_26_14',
      value: true
    }],
    text: {
      zh: 'Specify',
      en: 'Specify'
    }
  }, {
    name: 'followup_27',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Post-assessment in multidisciplinary therapy group',
      en: 'Post-assessment in multidisciplinary therapy group'
    }
  }, {
    name: 'followup_27_1',
    type: 'date',
    commit: [{
      rule: 'condition_require',
      field: 'followup_27',
      value: 1
    }],
    text: {
      zh: 'Date',
      en: 'Date'
    }
  }, {
    name: 'followup_27_2',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_27',
      conditionValue: 1,
      fields: 'followup_27_2,followup_27_3,followup_27_4,followup_27_5,followup_27_6',
    }],
    text: {
      zh: 'Surgeon',
      en: 'Surgeon'
    }
  }, {
    name: 'followup_27_3',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_27',
      conditionValue: 1,
      fields: 'followup_27_2,followup_27_3,followup_27_4,followup_27_5,followup_27_6',
    }],
    text: {
      zh: 'Oncologist',
      en: 'Oncologist'
    }
  }, {
    name: 'followup_27_4',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_27',
      conditionValue: 1,
      fields: 'followup_27_2,followup_27_3,followup_27_4,followup_27_5,followup_27_6',
    }],
    text: {
      zh: 'Pathologist',
      en: 'Pathologist'
    }
  }, {
    name: 'followup_27_5',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_27',
      conditionValue: 1,
      fields: 'followup_27_2,followup_27_3,followup_27_4,followup_27_5,followup_27_6',
    }],
    text: {
      zh: 'Radiologist',
      en: 'Radiologist'
    }
  }, {
    name: 'followup_27_6',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_27',
      conditionValue: 1,
      fields: 'followup_27_2,followup_27_3,followup_27_4,followup_27_5,followup_27_6',
    }],
    text: {
      zh: 'Nurse',
      en: 'Nurse'
    }
  }, {
    name: 'followup_28',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Referred to oncology treatment',
      en: 'Referred to oncology treatment'
    }
  }, {
    name: 'followup_28_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_28',
      value: 1
    }],
    text: {
      zh: 'Hospital/clinic',
      en: 'Hospital/clinic'
    }
  }, {
    name: 'followup_29',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Further treatment and reassessment with curative intention planned',
      en: 'Further treatment and reassessment with curative intention planned'
    }
  }, {
    name: 'followup_30',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoDontknowConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Has the patient been referred to or assessed by organ specialist for metastatic surgery',
      en: 'Has the patient been referred to or assessed by organ specialist for metastatic surgery'
    }
  }, {
    name: 'followup_31',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Follow-up planned in addition to postoperative return visit',
      en: 'Follow-up planned in addition to postoperative return visit'
    }
  }, {
    name: 'followup_31_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_31',
      value: 1
    }],
    text: {
      zh: 'Follow-up hospital / clinic',
      en: 'Follow-up hospital / clinic'
    }
  }, {
    name: 'followup_32',
    type: 'select',
    required: true,
    optionsGetter: 'getYesNoConfig',
    commit: [{
      rule: 'required',
    }],
    text: {
      zh: 'Patient included in study',
      en: 'Patient included in study'
    }
  }, {
    name: 'followup_32_1',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'ADEPT',
      en: 'ADEPT'
    }
  }, {
    name: 'followup_32_2',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'Screened in ALASCCA',
      en: 'Screened in ALASCCA'
    }
  }, {
    name: 'followup_32_3',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'Randomized in ALASCCA',
      en: 'Randomized in ALASCCA'
    }
  }, {
    name: 'followup_32_4',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'FOxTROT',
      en: 'FOxTROT'
    }
  }, {
    name: 'followup_32_5',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'HAPIrect',
      en: 'HAPIrect'
    }
  }, {
    name: 'followup_32_6',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'NEAPE',
      en: 'NEAPE'
    }
  }, {
    name: 'followup_32_7',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'QoLiCOL',
      en: 'QoLiCOL'
    }
  }, {
    name: 'followup_32_8',
    type: 'checkbox',
    commit: [{
      rule: 'conditional_atleast_one_true',
      conditionField: 'followup_32',
      conditionValue: 1,
      fields: 'followup_32_1,followup_32_2,followup_32_3,followup_32_4,followup_32_5,followup_32_6,followup_32_7,followup_32_8',
    }],
    text: {
      zh: 'Other/local study',
      en: 'Other/local study'
    }
  }, {
    name: 'followup_32_8_1',
    type: 'textarea',
    commit: [{
      rule: 'conditional_require',
      field: 'followup_32_8',
      value: true
    }],
    text: {
      zh: 'Specify',
      en: 'Specify'
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
