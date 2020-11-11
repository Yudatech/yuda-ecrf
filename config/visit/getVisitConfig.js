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
    }
  ],
  formConfigs: [{
    name: 'postoperativeday',
    type: 'select',
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
