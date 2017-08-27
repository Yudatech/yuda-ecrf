const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '实验室检查',
    en: 'Laboratorial tests'
  },
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
      zh: '红细胞 (RBC)临床评估',
      en: 'RBC Evaluation'
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
      zh: '白细胞 (WBC)临床评估',
      en: 'WBC Evaluation'
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
      zh: '血红蛋白 (Hb)',
      en: 'Hb'
    },
    unit: 'g/L'
  }, {
    name: 'lab_6',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '血红蛋白 (Hb)临床评估',
      en: 'Hb Evaluation'
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
      zh: '中性粒细胞绝对计数 (ANC)临床评估',
      en: 'NEUT Evaluation'
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
      zh: '血小板 (PLT)临床评估',
      en: 'PLT Evaluation'
    }
  }, {
    name: 'lab_11',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '单核细胞百分比',
      en: 'MON%'
    },
    unit: '%'
  }, {
    name: 'lab_12',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '单核细胞百分比临床评估',
      en: 'MON% Evaluation'
    }
  }, {
    name: 'lab_13',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '淋巴细胞百分比',
      en: 'LYM%'
    },
    unit: '%'
  }, {
    name: 'lab_14',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '淋巴细胞百分比临床评估',
      en: 'LYM% Evaluation'
    }
  }, {
    name: 'lab_15',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '丙氨酸氨基转移酶 (ALT)',
      en: 'ALT'
    },
    unit: 'U/L'
  }, {
    name: 'lab_16',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '丙氨酸氨基转移酶 (ALT)临床评估',
      en: 'ALT Evaluation'
    }
  }, {
    name: 'lab_17',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '天门冬氨酸氨基转移酶 (AST)',
      en: 'AST'
    },
    unit: 'U/L'
  }, {
    name: 'lab_18',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '天门冬氨酸氨基转移酶 (AST)临床评估',
      en: 'AST Evaluation'
    }
  }, {
    name: 'lab_19',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白蛋白 (ALB)',
      en: 'Albumin (ALB)'
    },
    unit: 'g/L'
  }, {
    name: 'lab_20',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '白蛋白 (ALB)临床评估',
      en: 'Albumin (ALB) Evaluation'
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
      zh: '血尿素氮 (BUN)临床评估',
      en: 'BUN Evaluation'
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
      zh: '肌酐 (Cr)临床评估',
      en: 'Cr Evaluation'
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
      zh: '血糖 (Glu)临床评估',
      en: 'Glucose (Glu) Evaluation'
    }
  }, {
    name: 'lab_27',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶原时间 (PT)',
      en: 'PT'
    },
    unit: 'S'
  }, {
    name: 'lab_28',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '凝血酶原时间 (PT)临床评估',
      en: 'PT Evaluation'
    }
  }, {
    name: 'lab_29',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '活化部分凝血活酶时间 (APTT)',
      en: 'APTT'
    },
    unit: 'S'
  }, {
    name: 'lab_30',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '活化部分凝血活酶时间 (APTT)临床评估',
      en: 'APTT Evaluation'
    }
  }, {
    name: 'lab_31',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶时间 (TT)',
      en: 'TT'
    },
    unit: 'S'
  }, {
    name: 'lab_32',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '凝血酶时间 (TT)临床评估',
      en: 'TT Evaluation'
    }
  }, {
    name: 'lab_33',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '纤维蛋白原 (FIB)',
      en: 'FIB'
    },
    unit: 'g/L'
  }, {
    name: 'lab_34',
    type: 'select',
    optionsGetter: 'getLabResultEvaluationConfig',
    text: {
      zh: '纤维蛋白原 (FIB)临床评估',
      en: 'FIB Evaluation'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  Object.keys(result.formConfigs).forEach((key) => {
    const item = result.formConfigs[key];
    if (item.unit !== undefined) {
      item.text = `${item.text}-${item.unit}`;
    }
  });
  result.title = config.title[lang];

  return result;
};
