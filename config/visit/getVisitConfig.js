const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加访视'
  },
  formConfigs: [{
    name: 'visitnum',
    type: 'numberfield',
    step: '1',
    text: {
      zh: '当天第n次访视'
    }
  }, {
    name: 'visitdtc',
    type: 'date',
    text: {
      zh: '访视日期'
    }
  }, {
    name: 'visittype',
    type: 'select',
    optionsGetter: 'getVisitTypesConfig',
    text: {
      zh: '访视方式'
    }
  }, {
    name: 'visitreason',
    type: 'textfield',
    text: {
      zh: '计划外访视原因'
    }
  }, {
    name: 'visittreat',
    type: 'textfield',
    text: {
      zh: '处理/治疗'
    }
  }, {
    name: 'visitres',
    type: 'select',
    optionsGetter: 'getVisitResConfig',
    text: {
      zh: '转归'
    }
  }, {
    name: 'param_1',
    type: 'select',
    optionsGetter: 'getVisitParam1Config',
    text: {
      zh: '腹痛'
    }
  }, {
    name: 'param_2',
    type: 'select',
    optionsGetter: 'getVisitParam2Config',
    text: {
      zh: '腹部触诊'
    }
  }, {
    name: 'param_3',
    type: 'select',
    optionsGetter: 'getVisitParam3Config',
    text: {
      zh: '切口感染'
    }
  }, {
    name: 'param_4',
    type: 'checkbox',
    text: {
      zh: '血常规检查(必要时)'
    }
  }, {
    name: 'param_5',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '血红蛋白 (Hb)'
    }
  }, {
    name: 'param_6',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '白细胞 (WBC)'
    }
  }, {
    name: 'param_7',
    type: 'numberfield',
    step: 'any',
    text: {
      zh: '体温'
    }
  }, {
    name: 'param_8',
    type: 'select',
    optionsGetter: 'getVisitParam8Config',
    text: {
      zh: '肠鸣音(根据医生检查)'
    }
  }, {
    name: 'param_9',
    type: 'checkbox',
    text: {
      zh: '肠鸣音(根据受试者感受)'
    }
  }, {
    name: 'param_10',
    type: 'checkbox',
    text: {
      zh: '排气'
    }
  }, {
    name: 'param_11',
    type: 'checkbox',
    text: {
      zh: '排便'
    }
  }, {
    name: 'param_12',
    type: 'checkbox',
    text: {
      zh: '进食'
    }
  }, {
    name: 'param_13',
    type: 'select',
    optionsGetter: 'getVisitFoodTypesConfig',
    text: {
      zh: '食物类型'
    }
  }, {
    name: 'param_14',
    type: 'select',
    optionsGetter: 'getVisitParam14Config',
    text: {
      zh: '拔除胃管'
    }
  }, {
    name: 'param_15',
    type: 'select',
    optionsGetter: 'getVisitParam14Config',
    text: {
      zh: '拔除腹部引流'
    }
  }, {
    name: 'param_16',
    type: 'checkbox',
    text: {
      zh: '其他检查'
    }
  }, {
    name: 'param_17',
    type: 'textarea',
    text: {
      zh: '其他检查(有，请注明检查项目及结果)'
    }
  }, {
    name: 'param_18',
    type: 'checkbox',
    text: {
      zh: '止痛药物使用'
    }
  }, {
    name: 'param_19',
    type: 'checkbox',
    text: {
      zh: '短期植入吻合环排出'
    }
  }, {
    name: 'param_20',
    type: 'checkbox',
    text: {
      zh: '自然排出'
    }
  }, {
    name: 'param_21',
    type: 'checkbox',
    text: {
      zh: '人工取出或经外科操作取出'
    }
  }, {
    name: 'param_22',
    type: 'checkbox',
    text: {
      zh: '不良事件'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.formConfigs = getOptionsLang(config.formConfigs);
  result.title = config.title[lang];

  return result;
};
