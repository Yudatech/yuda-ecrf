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
    zh: '未完成',
    en: 'Ongoing'
  },
  password: {
    zh: '密码',
    en: 'Password'
  },
  records: [{
    name: 'screening',
    total: 103,
    text: {
      zh: '首诊',
      en: 'Visit 1 (screening)'
    },
    children: [{
      name: 'screening-basic',
      text: {
        zh: '人口学资料',
        en: 'Demographic data'
      },
      linkBase: '/screening-basic'
    }, {
      name: 'screening-inclusion',
      text: {
        zh: '入选标准',
        en: 'Inclusion criteria'
      },
      linkBase: '/screening-inclusion'
    }, {
      name: 'screening-exclusion',
      text: {
        zh: '排除标准',
        en: 'Exclusion criteria'
      },
      linkBase: '/screening-exclusion'
    }, {
      name: 'screening-disease',
      text: {
        zh: '既往史',
        en: 'Anamnesis'
      },
      linkBase: '/screening-disease'
    }, {
      name: 'screening-conmed',
      text: {
        zh: '合并用药情况',
        en: 'Concomitant medication'
      },
      linkBase: '/screening-conmed'
    }, {
      name: 'screening-vitalsign',
      text: {
        zh: '体格检查',
        en: 'Clinical status'
      },
      linkBase: '/screening-vitalsign'
    }, {
      name: 'screening-lab',
      text: {
        zh: '实验室检查',
        en: 'Laboratorial tests'
      },
      linkBase: '/screening-lab'
    }, {
      name: 'screening-assistant',
      text: {
        zh: '辅助检查',
        en: 'Equipment examinations'
      },
      linkBase: '/screening-assistant'
    }, {
      name: 'screening-method',
      text: {
        zh: '诊断方法',
        en: 'Methods of diagnosis'
      },
      linkBase: '/screening-method'
    }, {
      name: 'screening-region',
      text: {
        zh: '病变位置',
        en: 'Location of the disease'
      },
      linkBase: '/screening-region'
    }, {
      name: 'screening-dignose',
      text: {
        zh: '临床，病理诊断及分期',
        en: 'Clinical diagnosis, pathological diagnosis and staging'
      },
      linkBase: '/screening-dignose'
    }]
  }, {
    name: 'screeningchecklist',
    total: 9,
    text: {
      zh: '首诊清单',
      en: 'sChecklist for Visit 1'
    },
    linkBase: '/screeningchecklist'
  }, {
    name: 'reviewchecklist',
    total: 4,
    text: {
      zh: '复诊',
      en: 'Visit 2 (Enrollment)'
    },
    linkBase: '/reviewchecklist'
  }, {
    name: 'discontinuation',
    total: 9,
    text: {
      zh: '中途退出试验',
      en: 'Withdrawal from the study'
    },
    linkBase: '/discontinuation'
  }, {
    name: 'surgery',
    total: 22,
    text: {
      zh: '手术',
      en: 'Operation'
    },
    linkBase: '/surgery'
  }, {
    name: 'visit',
    total: 28,
    text: {
      zh: '访视',
      en: 'Postoperative visit'
    },
    linkBase: '/visit'
  }, {
    name: 'cm',
    total: 7,
    text: {
      zh: '合并用药情况',
      en: 'Concomitant Medication Report'
    },
    linkBase: '/cm'
  }, {
    name: 'ae',
    total: 13,
    text: {
      zh: '不良事件',
      en: 'REPORT: Adverse Event (AE)/ Device Deficiency'
    },
    linkBase: '/ae'
  }, {
    name: 'sae',
    total: 24,
    text: {
      zh: '严重不良事件',
      en: 'REPORT: Severe Adverse Event (SAE)'
    },
    linkBase: '/sae'
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.records = JSON.parse(JSON.stringify(config.records));
  result.records.forEach((record) => {
    record.text = record.text[lang];
    if (record.children) {
      record.children.forEach((child) => {
        child.text = child.text[lang];
      });
    }
  });
  result.empty = config.empty[lang];
  result.finish = config.finish[lang];
  result.ongoing = config.ongoing[lang];
  result.password = config.password[lang];

  return result;
};
