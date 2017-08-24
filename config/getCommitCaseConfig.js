const config = {
  empty: {
    zh: '未填写'
  },
  finish: {
    zh: '已完成'
  },
  ongoing: {
    zh: '__NUM__ 项未填写'
  },
  password: {
    zh: '密码',
    en: 'Password'
  },
  configs: [{
    name: 'screening',
    total: 102,
    text: {
      zh: '首诊'
    }
  }, {
    name: 'screeningchecklist',
    total: 9,
    text: {
      zh: '首诊清单'
    }
  }, {
    name: 'reviewchecklist',
    total: 4,
    text: {
      zh: '复诊'
    }
  }, {
    name: 'discontinuation',
    total: 9,
    text: {
      zh: '中途退出试验'
    }
  }, {
    name: 'surgery',
    total: 22,
    text: {
      zh: '手术'
    }
  }, {
    name: 'visit',
    total: 28,
    text: {
      zh: '访视'
    }
  }, {
    name: 'cm',
    total: 7,
    text: {
      zh: '合并用药情况'
    }
  }, {
    name: 'ae',
    total: 13,
    text: {
      zh: '不良事件'
    }
  }, {
    name: 'sae',
    total: 17,
    text: {
      zh: '严重不良事件'
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
  result.password = config.password[lang];

  return result;
};
