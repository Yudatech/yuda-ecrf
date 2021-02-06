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
