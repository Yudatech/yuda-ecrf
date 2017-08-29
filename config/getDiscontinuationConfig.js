const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '中途退出试验',
    en: 'Withdrawal from the study'
  },
  formConfigs: [{
    name: 'discontinuetype',
    type: 'select',
    optionsGetter: 'getDiscontinuationTypeConfig',
    text: {
      zh: '受试者手术前退出试验',
      en: 'Withdrawal before the operation'
    }
  }, {
    name: 'discontinuedt',
    type: 'date',
    text: {
      zh: '退出时间',
      en: 'Time of withdraw'
    }
  }, {
    name: 'discontinuersn_1',
    type: 'checkbox',
    text: {
      zh: '进行试验相关手术前，受试者希望退出试验',
      en: 'The subject wishes to stop participating in the study before the surgery has been conducted.'
    }
  }, {
    name: 'discontinuersn_2',
    type: 'checkbox',
    text: {
      zh: '临床研究者认为不良事件和器械缺陷将引起受试者严重或永久性损伤',
      en: 'The clinical investigator believes that the subject should be removed from thestudy or if the subject alone believes that he/she should be removed from the study.'
    }
  }, {
    name: 'discontinuersn_3',
    type: 'checkbox',
    text: {
      zh: '临床研究者认为受试者应被排除或受试者自己认为应被排除',
      en: ' The subject violates conditions laid out in the consent form or disregards instructions by the clinical investigation personnel'
    }
  }, {
    name: 'discontinuersn_4',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明原因',
      en: 'Please sepcify:'
    }
  }, {
    name: 'discontinuersn_5',
    type: 'checkbox',
    text: {
      zh: '受试者违反知情同意书中所列条款或不能遵从临床研究者医嘱',
      en: 'The subject violates conditions laid out in the consent form or disregards instructions by the clinical investigation personnel'
    }
  }, {
    name: 'discontinuersn_6',
    type: 'checkbox',
    text: {
      zh: '其他原因',
      en: 'Others'
    }
  }, {
    name: 'discontinuersn_7',
    type: 'textarea',
    required: true,
    text: {
      zh: '请注明',
      en: 'Please specify:'
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
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.title = config.title[lang];

  return result;
};
