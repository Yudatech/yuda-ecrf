const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '中途退出试验',
    en: ''
  },
  formConfigs: [{
    name: 'discontinuetype',
    type: 'select',
    optionsGetter: 'getDiscontinuationTypeConfig',
    text: {
      zh: '受试者手术前退出试验'
    }
  }, {
    name: 'discontinuedt',
    type: 'date',
    text: {
      zh: '退出时间'
    }
  }, {
    name: 'discontinuersn_1',
    type: 'checkbox',
    text: {
      zh: '进行试验相关手术前，受试者希望退出试验'
    }
  }, {
    name: 'discontinuersn_2',
    type: 'checkbox',
    text: {
      zh: '临床研究者认为不良事件和器械缺陷将引起受试者严重或永久性损伤'
    }
  }, {
    name: 'discontinuersn_3',
    type: 'checkbox',
    text: {
      zh: '临床研究者认为受试者应被排除或受试者自己认为应被排除'
    }
  }, {
    name: 'discontinuersn_4',
    type: 'textarea',
    text: {
      zh: '临床研究者认为受试者应被排除或受试者自己认为应被排除,请注明原因'
    }
  }, {
    name: 'discontinuersn_5',
    type: 'checkbox',
    text: {
      zh: '受试者违反知情同意书中所列条款或不能遵从临床研究者医嘱'
    }
  }, {
    name: 'discontinuersn_6',
    type: 'checkbox',
    text: {
      zh: '其他原因'
    }
  }, {
    name: 'discontinuersn_7',
    type: 'textarea',
    text: {
      zh: '其他原因，请注明'
    }
  }, {
    name: 'discontinuersn_8',
    type: 'checkbox',
    text: {
      zh: '术中发现肠管直径异常或肠管壁厚度异常，例如憩室炎，慢性的肠梗阻',
      en: 'Detection of extreme variants of intestinal wall thickness during operation, for instance diverticulitis, chronic obstruction'
    }
  }, {
    name: 'discontinuersn_9',
    type: 'checkbox',
    text: {
      zh: '术中发现癌扩散',
      en: 'Detection of metastasis during operation'
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
