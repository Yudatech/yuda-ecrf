const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '既往史'
  },
  options: [{
    name: 'disease_1',
    text: {
      zh: '饮酒'
    }
  }, {
    name: 'disease_2',
    text: {
      zh: '肝硬化'
    }
  }, {
    name: 'disease_3',
    text: {
      zh: '吸烟'
    }
  }, {
    name: 'disease_4',
    text: {
      zh: '阻塞性肺疾患'
    }
  }, {
    name: 'disease_5',
    text: {
      zh: '糖尿病'
    }
  }, {
    name: 'disease_6',
    text: {
      zh: '心脏病'
    }
  }, {
    name: 'disease_7',
    text: {
      zh: '较大腹部手术史'
    }
  }, {
    name: 'disease_8',
    text: {
      zh: '其他疾病'
    }
  }, {
    name: 'disease_9',
    text: {
      zh: '其他疾病(请注明)'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = getOptionsLang(config.options);
  result.title = config.title[lang];

  return result;
};
