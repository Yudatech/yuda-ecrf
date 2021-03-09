const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '复诊（入组）',
    en: 'Prior to Surgery',
    sv: 'Dagen före operation',
  },
  subtitles: [
    {
      name: 'subtitle_1',
      text: {
        zh: '复诊（入组）',
        en: 'Prior to surgery',
      },
    },
  ],
  formConfigs: [
    {
      name: 'reviewcheckdate',
      type: 'date',
      required: true,
      commit: [
        {
          rule: 'date',
          start: 'subjAcceptDate',
          end: 'now',
        },
      ],
      text: {
        zh: '复诊日期',
        en: 'Date',
        sv: 'Datum för dagen före operation',
      },
    },
    {
      name: 'reviewcheck_2',
      type: 'checkbox',
      commit: [
        {
          rule: 'must_true',
        },
      ],
      text: {
        zh: '肠道清洁',
        en:
          'Complete bowel cleansing ((4000 ml Laxabon or 2000 ml Movprep) the evening before surgery + possibly another liter in the morning.)',
        sv: 'Fullständig tarmregöring',
      },
    },
    {
      name: 'reviewcheck_3',
      type: 'checkbox',
      commit: [
        {
          rule: 'must_true',
        },
      ],
      text: {
        zh: '预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)',
        en:
          'Antibiotic prophylaxis (T. Bactrim forte / Eusaprim forte 1 x 1 and T. Metronidazole 500 mg 3 x 1, 2–4 h before surgery (if allergy to sulfa give Zinacef 1.5 g x 1 iv and Metronidazole 1 g x 1 iv 30–60 min before surgery). (If surgery is delayed more than 8 hours, supplement with additional Bactrim or Zinacef, according to guidelines in FASS))',
      },
    },
    {
      name: 'reviewcheck_4',
      type: 'checkbox',
      commit: [
        {
          rule: 'must_true',
        },
      ],
      text: {
        zh: '预防性抗凝血药 (若使用抗凝血药，请完整填写《合并用药情况表》)',
        en: 'Prophylactic Antithrombotic therapy, Innohep 4500 E / Fragmin 5000 E evening before surgery',
      },
    },
  ],
  errors: [
    {
      name: 'error_1',
      text: {
        zh: '患者应完成上述所有术前准备和药物治疗',
        en: 'The patient should fullfill ALL of the preoperative preparation and medications above.',
      },
    },
  ],
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
