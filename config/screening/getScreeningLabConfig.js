const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '实验室检查',
    en: 'Laboratorial tests'
  },
  subtitles: [{
    name: 'subtitle_1',
    text: {
      zh: '血常规',
      en: 'Blood tests'
    }
  }, {
    name: 'subtitle_2',
    text: {
      zh: '肝功能',
      en: 'Liver function tests'
    }
  }, {
    name: 'subtitle_3',
    text: {
      zh: '肾功能',
      en: 'Kidney function tests'
    }
  }, {
    name: 'subtitle_4',
    text: {
      zh: 'Glucose (Glu)',
      en: 'Coagulation tests'
    }
  }, {
    name: 'subtitle_5',
    text: {
      zh: '凝血指标',
      en: 'Coagulation tests'
    }
  }],
  formConfigs: [{
    name: 'lab_1',
    type: 'numberfield',
    step: 'any',
    validation: {
      male: {
        max: 5.5,
        min: 4
      },
      female: {
        max: 5,
        min: 3.5
      }
    },
    text: {
      zh: '红细胞 (RBC)',
      en: 'RBC'
    },
    unit: '×10^12/L'
  }, {
    name: 'lab_2',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_3',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白细胞 (WBC)',
      en: 'WBC'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_4',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_5',
    type: 'numberfield',
    step: 'any',
    validation: {
      male: {
        max: 160,
        min: 120
      },
      female: {
        max: 150,
        min: 110
      }
    },
    text: {
      zh: '血红蛋白 (Hgb)',
      en: 'Hgb'
    },
    unit: '   g/L   '
  }, {
    name: 'lab_6',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_7',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '中性粒细胞绝对计数 (ANC)',
      en: 'NEUT'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_8',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_9',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血小板 (PLT)',
      en: 'PLT'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_10',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_11',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '单核细胞百分比',
      en: 'MON%'
    },
    unit: '   %    '
  }, {
    name: 'lab_12',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_13',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '淋巴细胞百分比',
      en: 'LYM%'
    },
    unit: '   %    '
  }, {
    name: 'lab_14',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_15',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '丙氨酸氨基转移酶 (ALT)',
      en: 'ALT'
    },
    unit: '   U/L  '
  }, {
    name: 'lab_16',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_17',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '天门冬氨酸氨基转移酶 (AST)',
      en: 'AST'
    },
    unit: '   U/L  '
  }, {
    name: 'lab_18',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_19',
    type: 'numberfield',
    step: 'any',
    validation: {
      min: 35
    },
    text: {
      zh: '白蛋白 (ALB)',
      en: 'Albumin (ALB)'
    },
    unit: '   g/L   '
  }, {
    name: 'lab_20',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_21',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血尿素氮 (BUN)',
      en: 'BUN'
    },
    unit: 'mmol/L'
  }, {
    name: 'lab_22',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_23',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肌酐 (Cr)',
      en: 'Cr'
    },
    unit: 'μmol/L'
  }, {
    name: 'lab_24',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_25',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血糖 (Glu)',
      en: 'Glucose (Glu)'
    },
    unit: 'mmol/L'
  }, {
    name: 'lab_26',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_27',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶原时间 (PT)',
      en: 'PT'
    },
    unit: '    S     '
  }, {
    name: 'lab_28',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_29',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '活化部分凝血活酶时间 (APTT)',
      en: 'APTT'
    },
    unit: '    S     '
  }, {
    name: 'lab_30',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_31',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶时间 (TT)',
      en: 'TT'
    },
    unit: '    S     '
  }, {
    name: 'lab_32',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }, {
    name: 'lab_33',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '纤维蛋白原 (FIB)',
      en: 'FIB'
    },
    unit: '   g/L   '
  }, {
    name: 'lab_34',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '临床评估',
      en: 'Evaluation'
    }
  }],
  errors: [{
    name: 'error_1',
    text: {
      zh: '白蛋白(ALB)<35 该结果不符合入组标准，请确认是否纳入该受试者',
      en: 'ALB<35. The result does not meet the inclusion criteria, please confirm whether the patient shall be included.'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.subtitles = getOptionsLang(config.subtitles, lang);
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];
  result.errors = getOptionsLang(config.errors, lang);

  return result;
};
