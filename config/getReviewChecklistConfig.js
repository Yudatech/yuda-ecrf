const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '复诊（入组）',
    en: 'Prior to Surgery',
    sv: 'Dagen före operation'
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '复诊（入组）',
        en: 'Prior to surgery'
      }
    }
  ],
  formConfigs: [{
    name: 'reviewcheckdate',
    type: 'date',
    required: true,
    commit: [{
      rule: 'date',
      start: 'subjAcceptDate',
      end: 'now'
    }],
    text: {
      zh: '复诊日期',
      en: 'Date',
      sv: 'Datum för dagen före operation'
    }
  }, {
    name: 'reviewcheck_2',
    type: 'checkbox',
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '肠道清洁',
      en: 'Full bowel cleansing (3-4 liter Movprep the evening before surgery and ad 1 liter in the morning as an option)',
      sv: 'Fullständig tarmregöring'
    }
  }, {
    name: 'reviewcheck_3',
    type: 'checkbox',
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)',
      en: 'Prophylactic Antibiotics (T. Bactrim forte/Eusaprim forte 1 x 1 and T. Metronidazole 500 mg 3 x 1, 2–4 h before surgery (if sulfa allergy give Zinacef 1.5 gx 1 IV and Metronidazole 1 gx 1 IV 30–60 min before surgery) If surgery is delayed more than 8 h after given T. Bactrim forte give a new dose prior surgery)'
    }
  }, {
    name: 'reviewcheck_4',
    type: 'checkbox',
    commit: [{
      rule: 'must_true'
    }],
    text: {
      zh: '预防性抗凝血药 (若使用抗凝血药，请完整填写《合并用药情况表》)',
      en: 'Trombosprofylax (Prophylactic Anti-Thrombotic therapy = Inj Innohep 4500 E /Fragmin 5000 E evening before surgery) '
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '患者应完成上述所有术前准备和药物治疗',
      en: 'The patient should fullfill ALL of the preoperative preparation and medications above.'
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
