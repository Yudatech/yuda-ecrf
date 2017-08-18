const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '实验室检查'
  },
  formConfigs: [{
    name: 'lab_1',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '红细胞 (RBC)'
    },
    unit: '×10^12/L'
  }, {
    name: 'lab_2',
    type: 'select',
    text: {
      zh: '红细胞 (RBC)临床评估'
    }
  }, {
    name: 'lab_3',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白细胞 (WBC)'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_4',
    type: 'select',
    text: {
      zh: '白细胞 (WBC)临床评估'
    }
  }, {
    name: 'lab_5',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血红蛋白 (Hb)'
    },
    unit: 'g/L'
  }, {
    name: 'lab_6',
    type: 'select',
    text: {
      zh: '血红蛋白 (Hb)临床评估'
    }
  }, {
    name: 'lab_7',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '中性粒细胞绝对计数 (ANC)'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_8',
    type: 'select',
    text: {
      zh: '中性粒细胞绝对计数 (ANC)临床评估'
    }
  }, {
    name: 'lab_9',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血小板 (PLT)'
    },
    unit: '×10^9/L'
  }, {
    name: 'lab_10',
    type: 'select',
    text: {
      zh: '血小板 (PLT)临床评估'
    }
  }, {
    name: 'lab_11',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '单核细胞百分比'
    },
    unit: '%'
  }, {
    name: 'lab_12',
    type: 'select',
    text: {
      zh: '单核细胞百分比临床评估'
    }
  }, {
    name: 'lab_13',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '淋巴细胞百分比'
    },
    unit: '%'
  }, {
    name: 'lab_14',
    type: 'select',
    text: {
      zh: '淋巴细胞百分比临床评估'
    }
  }, {
    name: 'lab_15',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '丙氨酸氨基转移酶 (ALT)'
    },
    unit: 'U/L'
  }, {
    name: 'lab_16',
    type: 'select',
    text: {
      zh: '丙氨酸氨基转移酶 (ALT)临床评估'
    }
  }, {
    name: 'lab_17',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '天门冬氨酸氨基转移酶 (AST)'
    },
    unit: 'U/L'
  }, {
    name: 'lab_18',
    type: 'select',
    text: {
      zh: '天门冬氨酸氨基转移酶 (AST)临床评估'
    }
  }, {
    name: 'lab_19',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白蛋白 (ALB)'
    },
    unit: 'g/L'
  }, {
    name: 'lab_20',
    type: 'select',
    text: {
      zh: '白蛋白 (ALB)临床评估'
    }
  }, {
    name: 'lab_21',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血尿素氮 (BUN)'
    },
    unit: 'mmol/L'
  }, {
    name: 'lab_22',
    type: 'select',
    text: {
      zh: '血尿素氮 (BUN)临床评估'
    }
  }, {
    name: 'lab_23',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '肌酐 (Cr)'
    },
    unit: 'μmol/L'
  }, {
    name: 'lab_24',
    type: 'select',
    text: {
      zh: '肌酐 (Cr)临床评估'
    }
  }, {
    name: 'lab_25',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血糖 (Glu)'
    },
    unit: 'mmol/L'
  }, {
    name: 'lab_26',
    type: 'select',
    text: {
      zh: '血糖 (Glu)临床评估'
    }
  }, {
    name: 'lab_27',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶原时间 (PT)'
    },
    unit: 'S'
  }, {
    name: 'lab_28',
    type: 'select',
    text: {
      zh: '凝血酶原时间 (PT)临床评估'
    }
  }, {
    name: 'lab_29',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '活化部分凝血活酶时间 (APTT)'
    },
    unit: 'S'
  }, {
    name: 'lab_30',
    type: 'select',
    text: {
      zh: '活化部分凝血活酶时间 (APTT)临床评估'
    }
  }, {
    name: 'lab_31',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '凝血酶时间 (TT)'
    },
    unit: 'S'
  }, {
    name: 'lab_32',
    type: 'select',
    text: {
      zh: '凝血酶时间 (TT)临床评估'
    }
  }, {
    name: 'lab_33',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '纤维蛋白原 (FIB)'
    },
    unit: 'g/L'
  }, {
    name: 'lab_34',
    type: 'select',
    text: {
      zh: '纤维蛋白原 (FIB)临床评估'
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
