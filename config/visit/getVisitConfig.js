const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '添加访视'
  },
  labels: [{
    name: 'visitnum',
    text: {
      zh: '当天第n次访视'
    }
  }, {
    name: 'visitdtc',
    text: {
      zh: '访视日期'
    }
  }, {
    name: 'visittype',
    text: {
      zh: '访视方式'
    }
  }, {
    name: 'visitreason',
    text: {
      zh: '计划外访视原因'
    }
  }, {
    name: 'visittreat',
    text: {
      zh: '处理/治疗'
    }
  }, {
    name: 'visitres',
    text: {
      zh: '转归'
    }
  }, {
    name: 'param_1',
    text: {
      zh: '腹痛'
    }
  }, {
    name: 'param_2',
    text: {
      zh: '腹部触诊'
    }
  }, {
    name: 'param_3',
    text: {
      zh: '切口感染'
    }
  }, {
    name: 'param_4',
    text: {
      zh: '血常规检查(必要时)'
    }
  }, {
    name: 'param_5',
    text: {
      zh: '血红蛋白 (Hb)'
    }
  }, {
    name: 'param_6',
    text: {
      zh: '白细胞 (WBC)'
    }
  }, {
    name: 'param_7',
    text: {
      zh: '体温'
    }
  }, {
    name: 'param_8',
    text: {
      zh: '肠鸣音(根据医生检查)'
    }
  }, {
    name: 'param_9',
    text: {
      zh: '肠鸣音(根据受试者感受)'
    }
  }, {
    name: 'param_10',
    text: {
      zh: '排气'
    }
  }, {
    name: 'param_11',
    text: {
      zh: '排便'
    }
  }, {
    name: 'param_12',
    text: {
      zh: '进食'
    }
  }, {
    name: 'param_13',
    text: {
      zh: '食物类型'
    }
  }, {
    name: 'param_14',
    text: {
      zh: '拔除胃管'
    }
  }, {
    name: 'param_15',
    text: {
      zh: '拔除腹部引流'
    }
  }, {
    name: 'param_16',
    text: {
      zh: '其他检查'
    }
  }, {
    name: 'param_17',
    text: {
      zh: '其他检查(有，请注明检查项目及结果)'
    }
  }, {
    name: 'param_18',
    text: {
      zh: '止痛药物使用'
    }
  }, {
    name: 'param_19',
    text: {
      zh: '短期植入吻合环排出'
    }
  }, {
    name: 'param_20',
    text: {
      zh: '自然排出'
    }
  }, {
    name: 'param_21',
    text: {
      zh: '人工取出或经外科操作取出'
    }
  }, {
    name: 'param_22',
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
  result.labels = getOptionsLang(config.labels);
  result.title = config.title[lang];

  return result;
};
