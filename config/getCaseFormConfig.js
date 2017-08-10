const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '新建病例'
  },
  labels: [{
    name: '_id',
    text: {
      zh: '受试者编号'
    }
  }, {
    name: 'subjname',
    text: {
      zh: '受试者姓名'
    }
  }, {
    name: 'subjabbr',
    text: {
      zh: '受试者姓名缩写'
    }
  }, {
    name: 'subjAcceptDate',
    text: {
      zh: '知情同意书签署日期'
    }
  }, {
    name: 'attachedDoc',
    text: {
      zh: '知情同意书原件上传'
    }
  }],
  buttons: [{
    name: 'saveNewCase',
    text: {
      zh: '保存'
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
  result.buttons = getOptionsLang(config.buttons);

  return result;
};
