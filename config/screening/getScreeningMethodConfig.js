const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '首诊(筛选)',
    en: 'Preoperative Screening'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '诊断方法',
        en: 'Diagnosis methods'
      }
    }
  ],
  formConfigs: [{
    name: 'method_1',
    type: 'checkbox',
    text: {
      zh: '内窥镜检查',
      en: 'Endoscopy'
    }
  }, {
    name: 'method_2',
    type: 'checkbox',
    text: {
      zh: 'CT/MR检查',
      en: 'CT/MR'
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

  return result;
};
