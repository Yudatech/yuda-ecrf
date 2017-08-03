const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    zh: '首诊清单'
  },
  options: [{
    name: 'screeningcheck_1',
    text: {
      zh: '根据标准入选/排除，在病例报告表中登记'
    }
  }, {
    name: 'screeningcheck_2',
    text: {
      zh: '向患者口头告知本试验研究信息，演示C-REX LapAid和C-REX DMH/DMHC'
    }
  }, {
    name: 'screeningcheck_3',
    text: {
      zh: '向患者提供本试验研究的书面资料'
    }
  }, {
    name: 'screeningcheck_4',
    text: {
      zh: '患者在知情同意书上签字'
    }
  }, {
    name: 'screeningcheck_5',
    text: {
      zh: '在病例报告表中登记受试者人口学资料'
    }
  }, {
    name: 'screeningcheck_6',
    text: {
      zh: '在病例报告表中记录受试者病史'
    }
  }, {
    name: 'screeningcheck_7',
    text: {
      zh: '在病例报告表中记录受试者合并用药情况'
    }
  }, {
    name: 'screeningcheck_8',
    text: {
      zh: '向受试者下医嘱行术前肠道清洁'
    }
  }, {
    name: 'screeningcheck_9',
    text: {
      zh: '诊断方法、结果记录在病'
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
