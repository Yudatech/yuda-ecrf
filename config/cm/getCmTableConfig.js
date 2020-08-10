const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '合并用药情况',
    en: 'Concomitant Medication Report'
  },
  headers: [{
    name: 'drug',
    text: {
      zh: '药物名称',
      en: 'Name (Commercial name)'
    }
  }, {
    name: 'dosing',
    text: {
      zh: '剂量',
      en: 'Dose'
    }
  }, {
    name: 'dosemtd',
    text: {
      zh: '给药途径',
      en: 'Administration'
    }
  }, {
    name: 'cmstdtc',
    text: {
      zh: '开始日期',
      en: 'Date of start'
    }
  }, {
    name: 'cmeddtc',
    text: {
      zh: '结束日期',
      en: 'Date of end'
    }
  }, {
    name: 'cmrsn',
    text: {
      zh: '用药原因',
      en: 'Reason'
    }
  }, {
    name: 'operations',
    text: {
      zh: '操作',
      en: 'Operations'
    }
  }],
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除合并用药',
      en: 'Confirm to remove Concomitant Medication Report'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.headers = config.headers.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  });
  result.title = config.title[lang];
  result.removeConfirm = getOptionsLang(config.removeConfirm, lang);

  return result;
};
