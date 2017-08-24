const config = {
  empty: {
    zh: '未填写',
    en: 'Empty'
  },
  finish: {
    zh: '已完成',
    en: 'Finished'
  },
  ongoing: {
    zh: '__NUM__ 项未填写',
    en: '__NUM__ ongoing'
  },
  configs: [{
    name: 'screening',
    total: 102,
    text: {
      zh: '首诊',
      en: 'Visit 1 (screening)'
    }
  }, {
    name: 'screeningchecklist',
    total: 9,
    text: {
      zh: '首诊清单',
      en: 'sChecklist for Visit 1'
    }
  }, {
    name: 'reviewchecklist',
    total: 4,
    text: {
      zh: '复诊',
      en: 'Visit 2 (Enrollment)'
    }
  }, {
    name: 'discontinuation',
    total: 9,
    text: {
      zh: '中途退出试验',
      en: 'Withdrawal from the study'
    }
  }, {
    name: 'surgery',
    total: 22,
    text: {
      zh: '手术',
      en: 'Operation'
    }
  }, {
    name: 'visit',
    total: 28,
    text: {
      zh: '访视',
      en: 'Postoperative visit'
    }
  }, {
    name: 'cm',
    total: 7,
    text: {
      zh: '合并用药情况',
      en: 'Concomitant Medication Report'
    }
  }, {
    name: 'ae',
    total: 13,
    text: {
      zh: '不良事件',
      en: 'REPORT: Adverse Event (AE)/ Device Deficiency'
    }
  }, {
    name: 'sae',
    total: 17,
    text: {
      zh: '严重不良事件',
      en: 'REPORT: Severe Adverse Event (SAE)'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.configs = config.configs.map((item) => {
    const newObj = {};
    Object.assign(newObj, item);
    newObj.text = item.text[lang];
    return newObj;
  });
  result.empty = config.empty[lang];
  result.finish = config.finish[lang];
  result.ongoing = config.ongoing[lang];

  return result;
};
